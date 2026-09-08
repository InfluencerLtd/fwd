/**
 * briefing-submissions.ts  (server only)
 * ---------------------------------------------------------------------------
 * Saving something a member has sent in for the briefing.
 *
 * One table, one write, no CRM and no acknowledgement email. A membership
 * application is a relationship being opened and has a lot hanging off it; this
 * is somebody passing on a thing they noticed, and the useful behaviour is that
 * it lands somewhere the people writing the briefing will see it.
 *
 * NOTHING IS DEDUPLICATED BY EMAIL. Unlike a sign-up or an application, the
 * same person sending two things is two things, not the same thing twice.
 */

import { getServiceClient } from "@/lib/supabase";

export type BriefingSubmissionInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /**
   * Whether we may put their name to it.
   *
   * Passed rather than defaulted, so this file never has to guess. The form
   * sends what the box actually said, and the box starts empty.
   */
  attributable: boolean;
};

export type BriefingSubmissionResult =
  | { status: "saved" }
  /** The table has not been created yet. Not the sender's problem. */
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function recordBriefingSubmission(
  input: BriefingSubmissionInput,
): Promise<BriefingSubmissionResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const { error } = await supabase.from("briefing_submissions").insert({
    name: input.name,
    email: input.email.toLowerCase(),
    subject: input.subject,
    message: input.message,
    attributable: input.attributable,
  });

  if (error) return { status: "failed", reason: error.message };
  return { status: "saved" };
}
