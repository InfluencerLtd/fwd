/**
 * session.ts  (server only)
 * ---------------------------------------------------------------------------
 * Who is signed in.
 *
 * A session is a signed cookie holding nothing but the member's id. It is
 * signed with a secret only the server knows, so it cannot be edited: change
 * one character and the signature stops matching and the session is rejected.
 *
 * The cookie is httpOnly, which means no JavaScript running in the page can
 * read it, so a script injected into the page cannot steal somebody's session.
 *
 * Sessions are long, because members should not have to sign in every visit.
 */

import { cookies } from "next/headers";
import { createToken, readToken } from "@/lib/tokens";
import { getServiceClient } from "@/lib/supabase";
import type { MemberGroupId } from "@/lib/brand";

export const SESSION_COOKIE = "fwd-session";
export const SESSION_PURPOSE = "session";

/**
 * How long a session lasts, and how it stays alive.
 *
 * A session is good for 90 days, and it is ROLLING: every day a member uses the
 * site, the 90 days starts again, so somebody who visits regularly never gets
 * signed out. The renewal happens in src/proxy.ts.
 *
 * The 90 days still matters, because it is what expires a session nobody is
 * using. A laptop left in a taxi stops being a way in three months later rather
 * than never, which is the point of having a number at all.
 */
export const SESSION_DAYS = 90;

/** Renew at most once a day, rather than writing a cookie on every request. */
export const SESSION_RENEW_AFTER_DAYS = 1;

export type Member = {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  market: string;
  group_type: MemberGroupId;
  bio: string;
  photo_url: string | null;
  link: string | null;
  newsletter_opt_in: boolean;
  introductions_opt_in: boolean;
  is_dummy: boolean;
};

export async function startSession(memberId: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createToken(SESSION_PURPOSE, memberId, SESSION_DAYS * 86400), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/**
 * The member currently signed in, or null.
 *
 * This checks the member is still active on every request rather than trusting
 * the cookie, so removing somebody's membership takes effect immediately
 * instead of whenever their session happens to expire.
 */
export async function getCurrentMember(): Promise<Member | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const check = readToken(SESSION_PURPOSE, token);
  if (!check.valid) return null;

  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("members")
    .select(
      "id, email, name, role, company, market, group_type, bio, photo_url, link, newsletter_opt_in, introductions_opt_in, is_dummy",
    )
    .eq("id", check.subject)
    .eq("status", "active")
    .single();

  return (data as Member) ?? null;
}
