/**
 * unsubscribe.ts  (server only)
 * ---------------------------------------------------------------------------
 * Honors an unsubscribe.
 *
 * The row is marked rather than deleted, on purpose. Deleting it would mean we
 * no longer know the person asked not to be contacted, and they would end up
 * back on the list the next time somebody imported a spreadsheet.
 */

import { getServiceClient } from "@/lib/supabase";

export type UnsubscribeResult =
  | { status: "done" }
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function unsubscribeEmail(
  email: string,
): Promise<UnsubscribeResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const now = new Date().toISOString();
  const address = email.toLowerCase();

  // The address may be on either list, or both, so mark both.
  const [signups, applications] = await Promise.all([
    supabase.from("signups").update({ unsubscribed_at: now }).eq("email", address),
    supabase
      .from("applications")
      .update({ unsubscribed_at: now })
      .eq("email", address),
  ]);

  const problem = signups.error ?? applications.error;
  if (problem) return { status: "failed", reason: problem.message };

  return { status: "done" };
}
