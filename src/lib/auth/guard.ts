/**
 * guard.ts  (server only)
 * ---------------------------------------------------------------------------
 * The one way a House page asks "who is this, and are they allowed in".
 *
 * Every page inside The House calls `requireMember` at the top, with one
 * deliberate exception: the single event page, which has to be viewable by an
 * invited person who is not signed in. That page handles its own rules and says
 * so in its own comments.
 */

import { redirect } from "next/navigation";
import { getCurrentMember, type Member } from "@/lib/auth/session";

/**
 * @param currentPath where the member is trying to go, so that after signing in
 *   they land back there rather than on a generic home screen.
 */
export async function requireMember(currentPath: string): Promise<Member> {
  const member = await getCurrentMember();
  if (member) return member;
  redirect(`/clubhouse/sign-in?next=${encodeURIComponent(currentPath)}`);
}
