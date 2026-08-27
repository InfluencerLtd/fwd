/**
 * decisions.ts  (server only)
 * ---------------------------------------------------------------------------
 * Accepting or declining a membership application.
 *
 * Same principle as everywhere else: the decision is recorded in our own
 * database first, and the email goes afterwards. If the email fails, the
 * decision still stands and the failure is reported, rather than the decision
 * being silently lost because a mail service had a bad minute.
 */

import { getServiceClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { EMAILS } from "@/content/emails";

export type Decision = "accepted" | "declined";

export type DecisionResult =
  | { status: "done"; emailed: true }
  /** The decision was recorded but the email did not go. Worth telling the team. */
  | { status: "done"; emailed: false; emailProblem: string }
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function decideApplication(
  applicationId: string,
  decision: Decision,
  decidedBy: string,
): Promise<DecisionResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const { data: application, error: readError } = await supabase
    .from("applications")
    .select("id, name, email, role, company, group_type, market, link, status")
    .eq("id", applicationId)
    .single();

  if (readError || !application) {
    return { status: "failed", reason: readError?.message ?? "not found" };
  }

  const { error: writeError } = await supabase
    .from("applications")
    .update({
      status: decision,
      decided_at: new Date().toISOString(),
      decided_by: decidedBy,
    })
    .eq("id", applicationId);

  if (writeError) return { status: "failed", reason: writeError.message };

  // Accepting has to create the member record, or the welcome email sends
  // somebody to a sign-in screen that will not let them in.
  if (decision === "accepted") {
    const { error: memberError } = await supabase.from("members").upsert(
      {
        email: application.email,
        name: application.name,
        role: application.role ?? "",
        company: application.company ?? "",
        market: application.market ?? "",
        group_type: application.group_type,
        link: application.link,
        application_id: application.id,
        status: "active",
      },
      { onConflict: "email" },
    );

    if (memberError) {
      // Better to stop than to send somebody a welcome they cannot act on.
      console.error(
        "[fwd.] Could not create a member record for",
        application.email,
        memberError.message,
      );
      return { status: "failed", reason: memberError.message };
    }
  }

  const template = decision === "accepted" ? EMAILS.accepted : EMAILS.declined;
  const sent = await sendEmail(template, {
    name: application.name,
    email: application.email,
  });

  if (sent.sent) return { status: "done", emailed: true };

  console.error(
    `[fwd.] Application ${applicationId} was marked ${decision}, but the email did not send:`,
    sent.reason,
  );
  return { status: "done", emailed: false, emailProblem: sent.reason };
}

/** The applications still waiting on a decision. */
export async function findPendingApplications(limit = 100) {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("applications")
    .select(
      "id, name, email, role, company, group_type, market, link, reason, created_at, hubspot_synced_at",
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(limit);

  return data ?? [];
}
