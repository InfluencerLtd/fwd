/**
 * rate-limit.ts  (server only)
 * ---------------------------------------------------------------------------
 * Stops the two public forms being submitted a thousand times.
 *
 * Signing in has always been limited. The application form and the "keep me
 * posted" form had nothing, and they are the two things on this site that
 * anybody on the internet can reach and that write to a database. A script
 * pointed at either one could fill the table, and the CRM behind it, as fast as
 * it could post.
 *
 * TWO THINGS ARE COUNTED, NOT ONE.
 *
 * By email, which catches the honest double-click and the person who submits
 * twice because they were not sure it worked. By connection, which is the one
 * that matters: a script that changes the email on every request looks like a
 * hundred different people, and counting answers cannot see that. Counting the
 * connection can.
 *
 * NOTHING REVERSIBLE IS STORED. The IP address is personal data, and kept in
 * clear this table would be a log of who visited the site and when — a worse
 * thing to hold than the problem it solves. It is hashed with the server secret
 * before it is written, so the table can answer "have I seen this one already"
 * and cannot answer "who was it".
 *
 * IT FAILS OPEN. If the count itself errors, the submission is allowed through
 * and the error is logged. A wobble in the database should not turn away a real
 * applicant, and it costs nothing to be relaxed about it: the write that
 * follows goes to the same database, so if it is genuinely down the submission
 * fails anyway, on its own terms, with a message that says so.
 */

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { getServiceClient } from "@/lib/supabase";

/**
 * The limits, per hour.
 *
 * Deliberately generous for a person and hopeless for a script. Nobody applies
 * for membership four times in an hour; a bot does not bother starting.
 */
export const LIMITS = {
  application: { perAddress: 3, perConnection: 5 },
  signup: { perAddress: 3, perConnection: 5 },
} as const;

const WINDOW_MINUTES = 60;

export type Bucket = keyof typeof LIMITS;

function hash(bucket: string, value: string): string {
  const secret = process.env.LINK_SECRET;
  if (!secret) {
    throw new Error("LINK_SECRET is not set. Rate limiting cannot work without it.");
  }
  // The bucket is part of what is hashed, so the same address in two buckets
  // produces two unrelated keys and neither table can be matched to the other.
  return createHmac("sha256", secret).update(`ratelimit:${bucket}:${value}`).digest("hex");
}

/**
 * The caller's address, or null if there isn't one to be had.
 *
 * ON VERCEL THESE HEADERS ARE TRUSTWORTHY, because Vercel's edge sets them
 * itself and overwrites anything the client sent. That is the only reason this
 * is safe to count: behind a proxy that merely passes headers along, anybody
 * could claim to be a different address on every request and this would be
 * worth nothing.
 *
 * Running locally there is no proxy and no header, and the answer is null. The
 * limit by email still applies, so `npm run dev` is not left wide open, and a
 * developer testing the form is not locked out of their own machine.
 */
async function connection(): Promise<string | null> {
  const h = await headers();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  // A list when there are proxies in front of proxies. The client is first.
  const forwarded = h.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || null;
}

async function countSince(
  bucket: string,
  keyHash: string,
  since: string,
): Promise<number | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { count, error } = await supabase
    .from("rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("bucket", bucket)
    .eq("key_hash", keyHash)
    .gte("created_at", since);

  if (error) {
    console.error("[fwd.] Could not check a rate limit, allowing through:", error.message);
    return null;
  }
  return count ?? 0;
}

/**
 * Records this attempt and says whether it is one too many.
 *
 * `true` means turn it away. Call it once per submission, before doing the
 * work: it writes a row whether or not the limit is hit, which is what makes a
 * script that keeps hammering stay locked out rather than getting a fresh
 * allowance every hour it is patient enough to wait.
 */
export async function isRateLimited(bucket: Bucket, email: string): Promise<boolean> {
  const supabase = getServiceClient();
  // Not configured is somebody else's error to report. The submission is about
  // to fail on its own with a message that explains it.
  if (!supabase) return false;

  const limits = LIMITS[bucket];
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const ip = await connection();
  const keys: Array<{ hash: string; max: number }> = [
    { hash: hash(`${bucket}:address`, email.trim().toLowerCase()), max: limits.perAddress },
  ];
  if (ip) keys.push({ hash: hash(`${bucket}:connection`, ip), max: limits.perConnection });

  // Every attempt is written down first, including the ones that are about to
  // be refused.
  const { error: writeError } = await supabase
    .from("rate_limits")
    .insert(keys.map((k) => ({ bucket, key_hash: k.hash })));
  if (writeError) {
    console.error("[fwd.] Could not record a rate limit, allowing through:", writeError.message);
    return false;
  }

  for (const key of keys) {
    const seen = await countSince(bucket, key.hash, since);
    if (seen !== null && seen > key.max) return true;
  }

  // Sweep what has aged out, so the table never holds more than the last hour
  // rather than growing forever. Here rather than on a schedule because there is
  // then nothing to remember to run.
  //
  // IT IS AWAITED, and that is not an oversight to tidy up later. A Supabase
  // query is lazy: it is not sent until something asks for the result, so
  // firing this off without awaiting it would not be a background delete, it
  // would be no delete at all. Its own failure is not worth reporting — the
  // next submission tries again and a few stale rows harm nothing.
  const { error: sweepError } = await supabase
    .from("rate_limits")
    .delete()
    .lt("created_at", since);
  if (sweepError) {
    console.warn("[fwd.] Could not sweep old rate limit rows:", sweepError.message);
  }

  return false;
}
