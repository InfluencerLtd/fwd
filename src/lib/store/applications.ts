/**
 * applications.ts  (server only)
 * ---------------------------------------------------------------------------
 * Saving a membership application.
 *
 * The order of operations here is the important part:
 *
 *   1. Save the application to our own database.
 *   2. Only then try to push it to HubSpot.
 *   3. If HubSpot fails, record why against the application and move on.
 *
 * The applicant sees success as soon as step 1 works, because at that point
 * their application genuinely is safe. HubSpot being down is our problem to
 * clean up later, not a reason to turn somebody away or to ask them to apply
 * again.
 */

import { getServiceClient } from "@/lib/supabase";
import { upsertHubspotContact } from "@/lib/hubspot";
import { sendEmail } from "@/lib/email";
import { EMAILS } from "@/content/emails";
import type { MemberGroupId } from "@/lib/brand";

export type ApplicationInput = {
  name: string;
  email: string;
  role: string;
  company: string;
  group: MemberGroupId;
  market: string;
  link: string | null;
  reason: string;
};

export type ApplicationResult =
  | { status: "saved" }
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function submitApplication(
  input: ApplicationInput,
): Promise<ApplicationResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const now = new Date().toISOString();

  // --- Step 1. Our own database. This is the one that must not fail. -------
  const { data, error } = await supabase
    .from("applications")
    .upsert(
      {
        name: input.name,
        email: input.email.toLowerCase(),
        role: input.role,
        company: input.company,
        group_type: input.group,
        market: input.market,
        link: input.link,
        reason: input.reason,
        consented: true,
        consented_at: now,
      },
      { onConflict: "email" },
    )
    .select("id")
    .single();

  if (error) return { status: "failed", reason: error.message };

  // --- Step 2 and 3. Both allowed to fail. ---------------------------------
  // Neither of these can turn a saved application into a failed one. They are
  // run together rather than one after the other so a slow HubSpot does not
  // hold up the acknowledgement email.
  await Promise.allSettled([
    pushToHubspot(data.id, input),
    acknowledge(input),
  ]);

  return { status: "saved" };
}

/**
 * Pushes one application to HubSpot and records the outcome against it, so a
 * failure is visible and retryable rather than silent.
 */
export async function pushToHubspot(
  applicationId: string,
  input: ApplicationInput,
): Promise<void> {
  const supabase = getServiceClient();
  if (!supabase) return;

  const result = await upsertHubspotContact({
    email: input.email,
    name: input.name,
    role: input.role,
    company: input.company,
    group: input.group,
    market: input.market,
    link: input.link,
  });

  if (result.ok) {
    await supabase
      .from("applications")
      .update({
        hubspot_synced_at: new Date().toISOString(),
        hubspot_last_error: null,
      })
      .eq("id", applicationId);
    return;
  }

  // Not configured yet is expected, and should not look like a fault.
  if (!result.configured) {
    console.warn(
      "[fwd.] HubSpot is not connected yet, so application",
      applicationId,
      "was saved but not pushed. It will be picked up when a token is set.",
    );
  } else {
    console.error(
      "[fwd.] HubSpot push failed for application",
      applicationId,
      result.reason,
    );
  }

  // Record the failure so nothing is lost and a retry can find it.
  const { data: current } = await supabase
    .from("applications")
    .select("hubspot_attempts")
    .eq("id", applicationId)
    .single();

  await supabase
    .from("applications")
    .update({
      hubspot_attempts: (current?.hubspot_attempts ?? 0) + 1,
      hubspot_last_error: result.reason,
    })
    .eq("id", applicationId);
}

/**
 * Everything that still needs pushing to HubSpot. Used by the retry, so a spell
 * of HubSpot downtime is caught up rather than quietly dropped.
 */
export async function findApplicationsAwaitingHubspot(limit = 50) {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("applications")
    .select("id, name, email, role, company, group_type, market, link, reason")
    .is("hubspot_synced_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  return data ?? [];
}

/**
 * Tells the applicant we have their application. Failing to send this is not a
 * reason to fail the application, so the outcome is logged and nothing else.
 */
async function acknowledge(input: ApplicationInput): Promise<void> {
  const sent = await sendEmail(EMAILS.received, {
    name: input.name,
    email: input.email,
  });
  if (sent.sent) return;

  if (!sent.configured) {
    console.warn(
      "[fwd.] No email service connected, so",
      input.email,
      "was not sent an acknowledgement. Their application is still saved.",
    );
  } else {
    console.error(
      "[fwd.] Acknowledgement email failed for",
      input.email,
      sent.reason,
    );
  }
}
