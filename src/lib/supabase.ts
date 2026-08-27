/**
 * supabase.ts  (server only)
 * ---------------------------------------------------------------------------
 * Creates the connection to the database.
 *
 * The important thing here is the word "server". This uses the service role
 * key, which can do anything to the database, so it must never be sent to a
 * visitor's browser. It is only ever imported by server code.
 *
 * If the database has not been set up yet, this returns null rather than
 * crashing, and the code that calls it says so honestly instead of pretending
 * a sign-up was saved.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

export function getServiceClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** True once the Supabase project exists and its keys are in the environment. */
export function isDatabaseConfigured(): boolean {
  return getServiceClient() !== null;
}
