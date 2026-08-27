/**
 * codes.ts  (server only)
 * ---------------------------------------------------------------------------
 * The six-digit sign-in code. There are no passwords anywhere in this system.
 *
 * Three things here are deliberate and should not be "simplified" later:
 *
 * 1. THE CODE IS NEVER STORED. Only a hash of it is kept, tied to the email
 *    address it was issued for. Somebody who obtained a copy of the database
 *    still could not sign in as anybody.
 *
 * 2. THE ANSWER IS ALWAYS THE SAME. Whether or not the address belongs to a
 *    member, the person is told the same thing: if that address is a member's,
 *    a code is on its way. Saying "no such member" would turn this form into a
 *    way of finding out who is in the club, which is exactly the thing the
 *    directory is meant to protect.
 *
 * 3. ATTEMPTS AND REQUESTS ARE BOTH LIMITED. Six digits is a million
 *    possibilities, which is plenty when only five guesses are allowed, and
 *    nothing at all if unlimited guesses are allowed.
 */

import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { getServiceClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { EMAILS } from "@/content/emails";

/** How long a code is good for. Long enough to find the email, no longer. */
const CODE_MINUTES = 10;
/** Guesses allowed against one code before it is dead. */
const MAX_ATTEMPTS = 5;
/** Codes one address can ask for in an hour. */
const MAX_CODES_PER_HOUR = 5;

function hashCode(email: string, code: string): string {
  const secret = process.env.LINK_SECRET;
  if (!secret) throw new Error("LINK_SECRET is not set. Sign-in cannot work without it.");
  // The email is part of what is hashed, so a code issued for one address can
  // never be replayed against another.
  return createHmac("sha256", secret)
    .update(`signin:${email.toLowerCase()}:${code}`)
    .digest("hex");
}

function newCode(): string {
  // randomInt is cryptographically secure. Math.random is not, and must never
  // be used for anything that grants access.
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

export type RequestCodeResult =
  | { status: "sent" }
  /** Not a member. Told to the caller, never to the person. */
  | { status: "not-a-member" }
  | { status: "rate-limited" }
  | { status: "not-configured" }
  | { status: "failed"; reason: string };

export async function requestSignInCode(
  rawEmail: string,
): Promise<RequestCodeResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const email = rawEmail.trim().toLowerCase();

  const { data: member } = await supabase
    .from("members")
    .select("id, name")
    .eq("email", email)
    .eq("status", "active")
    .single();

  // No member, no code. The caller still shows the same message.
  if (!member) return { status: "not-a-member" };

  const anHourAgo = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase
    .from("login_codes")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", anHourAgo);

  if ((count ?? 0) >= MAX_CODES_PER_HOUR) return { status: "rate-limited" };

  const code = newCode();
  const { error } = await supabase.from("login_codes").insert({
    email,
    code_hash: hashCode(email, code),
    expires_at: new Date(Date.now() + CODE_MINUTES * 60_000).toISOString(),
  });
  if (error) return { status: "failed", reason: error.message };

  const sent = await sendEmail(
    {
      ...EMAILS.signIn,
      body: EMAILS.signIn.body.map((line) => line.replace("{code}", code)),
    },
    { name: member.name, email },
  );

  if (!sent.sent) {
    // The code exists but never reached them, which is useless. Say so.
    console.error("[fwd.] Sign-in code could not be emailed:", sent.reason);
    return { status: "failed", reason: sent.reason };
  }

  return { status: "sent" };
}

export type VerifyCodeResult =
  | { status: "ok"; memberId: string }
  | { status: "wrong" }
  | { status: "expired" }
  | { status: "too-many-attempts" }
  | { status: "not-configured" };

export async function verifySignInCode(
  rawEmail: string,
  rawCode: string,
): Promise<VerifyCodeResult> {
  const supabase = getServiceClient();
  if (!supabase) return { status: "not-configured" };

  const email = rawEmail.trim().toLowerCase();
  const code = rawCode.replace(/\D/g, "");
  if (code.length !== 6) return { status: "wrong" };

  const { data: row } = await supabase
    .from("login_codes")
    .select("id, code_hash, expires_at, attempts, consumed_at")
    .eq("email", email)
    .is("consumed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!row) return { status: "wrong" };
  if (row.attempts >= MAX_ATTEMPTS) return { status: "too-many-attempts" };
  if (new Date(row.expires_at) < new Date()) return { status: "expired" };

  const expected = Buffer.from(row.code_hash);
  const given = Buffer.from(hashCode(email, code));
  const matches =
    expected.length === given.length && timingSafeEqual(expected, given);

  if (!matches) {
    await supabase
      .from("login_codes")
      .update({ attempts: row.attempts + 1 })
      .eq("id", row.id);
    return { status: "wrong" };
  }

  // A code works exactly once.
  await supabase
    .from("login_codes")
    .update({ consumed_at: new Date().toISOString() })
    .eq("id", row.id);

  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("email", email)
    .eq("status", "active")
    .single();

  if (!member) return { status: "wrong" };
  return { status: "ok", memberId: member.id };
}
