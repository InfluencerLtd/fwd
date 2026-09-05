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
 *    way of finding out who is a member, which is exactly the thing the
 *    directory is meant to protect.
 *
 * 3. ATTEMPTS AND REQUESTS ARE BOTH LIMITED. Six digits is a million
 *    possibilities, which is plenty when only five guesses are allowed, and
 *    nothing at all if unlimited guesses are allowed.
 *
 * THE OWNER ADDRESS
 *
 * One address, set as OWNER_EMAIL in the environment, can always get in. If it
 * has no member record, or somebody removed it by accident, the record is
 * created or put back the moment a code is asked for.
 *
 * It is worth being precise about what that does and does not do. It guarantees
 * the address is always a member. It does NOT skip the code: the owner still
 * receives six digits and still has to type them. There is no address anywhere
 * in this system that can sign in without proving it can read the inbox, and
 * there should never be one, because a member directory of senior people at
 * client companies is exactly the thing worth breaking into.
 *
 * The address lives in the environment rather than in this file, so it can be
 * changed, and so the codebase does not name a specific person as privileged.
 */

import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { getServiceClient } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { MEMBER_GROUPS } from "@/lib/brand";
import { EMAILS } from "@/content/emails";

/** How long a code is good for. Long enough to find the email, no longer. */
const CODE_MINUTES = 10;
/** Guesses allowed against one code before it is dead. */
const MAX_ATTEMPTS = 5;
/** Codes one address can ask for in an hour. */
const MAX_CODES_PER_HOUR = 5;

/** True only for the one address set as OWNER_EMAIL in the environment. */
function isOwner(email: string): boolean {
  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase();
  return Boolean(owner) && owner === email.trim().toLowerCase();
}

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

  let { data: member } = await supabase
    .from("members")
    .select("id, name")
    .eq("email", email)
    .eq("status", "active")
    .single();

  // The owner is always a member. If the record is missing or was paused or
  // removed, it is restored here rather than locking the owner out of their own
  // site. They still have to type the code like everybody else.
  if (!member && isOwner(email)) {
    const { data: restored, error } = await supabase
      .from("members")
      .upsert(
        {
          email,
          name: process.env.OWNER_NAME || "Owner",
          // Has to be one of MEMBER_GROUPS. This record exists so the owner
          // cannot be locked out, not to say anything true about which group
          // they belong to, and the owner can change it on their own profile.
          group_type: MEMBER_GROUPS[0].id,
          status: "active",
        },
        { onConflict: "email" },
      )
      .select("id, name")
      .single();

    if (error) return { status: "failed", reason: error.message };
    member = restored;
    console.warn("[fwd.] Restored the owner's member record for", email);
  }

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
    // On your own computer, with no email service connected, the code is
    // printed in the terminal instead so you can still sign in and look
    // around. NODE_ENV is set by the build, not by a file, so this branch
    // cannot exist in a real deployment.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `\n[fwd.] No email service connected, so here is the sign-in code for ${email}:\n\n        ${code}\n\n       It works once and expires in ten minutes.\n`,
      );
      return { status: "sent" };
    }

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
