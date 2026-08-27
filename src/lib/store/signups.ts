/**
 * signups.ts  (server only)
 * ---------------------------------------------------------------------------
 * Saving an email address from the holding page or the waitlist.
 *
 * The one rule this file exists to enforce: never tell somebody we saved their
 * details when we did not. If the database is missing or the write fails, the
 * caller finds out, and the visitor is told honestly to try again.
 */

import { getServiceClient } from "@/lib/supabase";

export type SignupSource = "holding" | "waitlist";

export type SignupResult =
  | { status: "saved" }
  /** The database has not been created yet. Not the visitor's problem. */
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function recordSignup(
  email: string,
  source: SignupSource,
): Promise<SignupResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const now = new Date().toISOString();

  // If this address signed up before, update that row rather than adding a
  // second one, so the list never contains duplicates.
  const { error } = await supabase.from("signups").upsert(
    {
      email: email.toLowerCase(),
      source,
      consented: true,
      consented_at: now,
      // Someone signing up again has clearly changed their mind about any
      // earlier unsubscribe, so clear it.
      unsubscribed_at: null,
    },
    { onConflict: "email" },
  );

  if (error) return { status: "failed", reason: error.message };
  return { status: "saved" };
}
