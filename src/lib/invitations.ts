/**
 * invitations.ts  (server only)
 * ---------------------------------------------------------------------------
 * Event invitation links, and the rule about what they may and may not show.
 *
 * THE REQUIREMENT, IN FULL, BECAUSE IT IS EASY TO GET WRONG:
 *
 *   - An invitation email links to that event's own address.
 *   - The person invited can LOOK AT THE INVITATION WITHOUT SIGNING IN. Name,
 *     date, city, format, description, imagery. Signing in is not a gate on
 *     looking at it.
 *   - Signing in is only needed to RSVP, to change an RSVP, or to reach any
 *     other part of The Clubhouse.
 *   - Somebody signed out who clicks through and then signs in must land back
 *     on the event they clicked, not on a generic home screen.
 *   - The link must not be publicly guessable.
 *   - The view a token gives must NEVER show the member directory, who else is
 *     coming, or anything at all beyond that one event.
 *
 * The last point is why `publicEventView` exists below and returns a narrow,
 * fixed shape. Anything not in that shape cannot leak through the tokenised
 * view, whatever a page component later tries to render.
 */

import { createToken, readToken } from "@/lib/tokens";
import { CONTACT } from "@/lib/brand";

const INVITE_PURPOSE = "invite";
/** Long enough to survive an event being scheduled months out. */
const INVITE_DAYS = 180;

/**
 * A token is tied to BOTH the event and the person invited, so one recipient's
 * link cannot be handed round as a general-purpose key to the event, and a link
 * to one event is not a link to another.
 */
export function createInvitationToken(eventId: string, memberId: string): string {
  return createToken(INVITE_PURPOSE, `${eventId}|${memberId}`, INVITE_DAYS * 86400);
}

export function readInvitationToken(
  token: string,
): { eventId: string; memberId: string } | null {
  const check = readToken(INVITE_PURPOSE, token);
  if (!check.valid) return null;

  const [eventId, memberId] = check.subject.split("|");
  if (!eventId || !memberId) return null;
  return { eventId, memberId };
}

export function invitationUrl(
  slug: string,
  eventId: string,
  memberId: string,
): string {
  const token = createInvitationToken(eventId, memberId);
  return `${CONTACT.siteUrl}/clubhouse/events/${slug}?invite=${encodeURIComponent(token)}`;
}

/**
 * Everything a signed-out invitee is allowed to see about an event, and nothing
 * else. Deliberately a separate, explicit shape rather than "the event row
 * minus a few fields", so adding a column to the events table can never quietly
 * widen what an unauthenticated visitor can read.
 */
export type PublicEventView = {
  slug: string;
  title: string;
  city: string;
  format: string;
  description: string;
  detail: string;
  starts_at: string;
  ends_at: string | null;
  is_confirmed: boolean;
};

export function publicEventView(event: {
  slug: string;
  title: string;
  city: string;
  format: string;
  description: string;
  detail: string;
  starts_at: string;
  ends_at: string | null;
  is_confirmed: boolean;
}): PublicEventView {
  return {
    slug: event.slug,
    title: event.title,
    city: event.city,
    format: event.format,
    description: event.description,
    detail: event.detail,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    is_confirmed: event.is_confirmed,
  };
}

/**
 * Where to send somebody after they sign in.
 *
 * Only ever a path inside this site, and only inside The Clubhouse. Without
 * this check, a link like /clubhouse/sign-in?next=https://somewhere-else would
 * bounce a member straight out to another site immediately after they signed
 * in, which is a well-known way of stealing people.
 */
export function safeNextPath(next: string | undefined | null): string {
  const fallback = "/clubhouse";
  if (!next) return fallback;
  // Must be a plain path. Rejects "https://...", "//evil.example" and
  // "/\evil.example", all of which browsers treat as another site.
  if (!next.startsWith("/clubhouse")) return fallback;
  if (next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}
