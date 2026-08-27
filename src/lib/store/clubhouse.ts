/**
 * clubhouse.ts  (server only)
 * ---------------------------------------------------------------------------
 * Reading and writing everything inside the member area.
 *
 * Every function here goes through the service role key, which bypasses the
 * database's own row level security. That is why the CALLER must always have
 * established who is signed in first. There is no function in this file that
 * decides on its own whether somebody is allowed to see something, with one
 * deliberate exception: `getEventForInvitation`, which is documented where it
 * is defined.
 */

import { getServiceClient } from "@/lib/supabase";
import type { MemberGroupId } from "@/lib/brand";

export type DirectoryMember = {
  id: string;
  name: string;
  role: string;
  company: string;
  market: string;
  group_type: MemberGroupId;
  bio: string;
  photo_url: string | null;
  introductions_opt_in: boolean;
  is_dummy: boolean;
};

export type FwdEvent = {
  id: string;
  slug: string;
  title: string;
  city: string;
  format: string;
  description: string;
  detail: string;
  starts_at: string;
  ends_at: string | null;
  is_confirmed: boolean;
  is_dummy: boolean;
};

const EVENT_FIELDS =
  "id, slug, title, city, format, description, detail, starts_at, ends_at, is_confirmed, is_dummy";

/* ========================================================================== */
/* Directory                                                                  */
/* ========================================================================== */

export async function listMembers(): Promise<DirectoryMember[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("members")
    .select(
      "id, name, role, company, market, group_type, bio, photo_url, introductions_opt_in, is_dummy",
    )
    .eq("status", "active")
    .order("name", { ascending: true });

  return (data as DirectoryMember[]) ?? [];
}

export async function getMember(id: string): Promise<DirectoryMember | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("members")
    .select(
      "id, name, role, company, market, group_type, bio, photo_url, introductions_opt_in, is_dummy",
    )
    .eq("id", id)
    .eq("status", "active")
    .single();

  return (data as DirectoryMember) ?? null;
}

/* ========================================================================== */
/* Events                                                                     */
/* ========================================================================== */

export async function listEvents(): Promise<{
  upcoming: FwdEvent[];
  past: FwdEvent[];
} | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("events")
    .select(EVENT_FIELDS)
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  const events = (data as FwdEvent[]) ?? [];
  const now = Date.now();
  return {
    upcoming: events.filter((e) => new Date(e.ends_at ?? e.starts_at).getTime() >= now),
    past: events
      .filter((e) => new Date(e.ends_at ?? e.starts_at).getTime() < now)
      .reverse(),
  };
}

export async function getEventBySlug(slug: string): Promise<FwdEvent | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("events")
    .select(EVENT_FIELDS)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return (data as FwdEvent) ?? null;
}

/**
 * The one function here that serves somebody who is NOT signed in.
 *
 * It is used only by the invitation view, and it deliberately takes the event
 * id from the signed token rather than from anything in the address bar, so a
 * token for one event cannot be used to open another. The caller then passes
 * the result through `publicEventView`, which narrows it to the handful of
 * fields an invitee may see.
 */
export async function getEventForInvitation(
  eventId: string,
  slug: string,
): Promise<FwdEvent | null> {
  const event = await getEventBySlug(slug);
  if (!event) return null;
  // The token names the event. If the address names a different one, refuse.
  if (event.id !== eventId) return null;
  return event;
}

/* ========================================================================== */
/* RSVPs                                                                      */
/* ========================================================================== */

export type Rsvp = { response: "going" | "not_going" };

export async function getRsvp(
  eventId: string,
  memberId: string,
): Promise<Rsvp | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("rsvps")
    .select("response")
    .eq("event_id", eventId)
    .eq("member_id", memberId)
    .single();

  return (data as Rsvp) ?? null;
}

export async function setRsvp(
  eventId: string,
  memberId: string,
  response: "going" | "not_going",
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase.from("rsvps").upsert(
    {
      event_id: eventId,
      member_id: memberId,
      response,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "event_id,member_id" },
  );
  return !error;
}

/**
 * Who is coming. Only ever called for a SIGNED IN member: an invitee looking at
 * a tokenised invitation must never see this.
 */
export async function listAttendees(eventId: string): Promise<DirectoryMember[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("rsvps")
    .select(
      "members ( id, name, role, company, market, group_type, bio, photo_url, introductions_opt_in, is_dummy )",
    )
    .eq("event_id", eventId)
    .eq("response", "going");

  const rows = (data ?? []) as unknown as { members: DirectoryMember | null }[];
  return rows.map((r) => r.members).filter((m): m is DirectoryMember => Boolean(m));
}

/* ========================================================================== */
/* Meeting of Minds                                                           */
/* ========================================================================== */

export async function requestIntroduction(
  requesterId: string,
  targetId: string,
  reason: string,
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase.from("intro_requests").insert({
    requester_id: requesterId,
    target_id: targetId,
    reason,
  });
  return !error;
}

/* ========================================================================== */
/* Profile                                                                    */
/* ========================================================================== */

export type ProfileUpdate = {
  name: string;
  role: string;
  company: string;
  market: string;
  bio: string;
  link: string | null;
  newsletter_opt_in: boolean;
  introductions_opt_in: boolean;
};

/**
 * A member updates their own record. The id comes from the session, never from
 * the form, so nobody can edit somebody else's profile by changing a hidden
 * field.
 */
export async function updateOwnProfile(
  memberId: string,
  update: ProfileUpdate,
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("members")
    .update({ ...update, updated_at: new Date().toISOString() })
    .eq("id", memberId);
  return !error;
}

/* ========================================================================== */
/* Newsletter                                                                 */
/* ========================================================================== */

export type NewsletterIssue = {
  id: string;
  slug: string;
  title: string;
  published_at: string;
  body: string;
};

export async function listNewsletterIssues(): Promise<NewsletterIssue[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("newsletter_issues")
    .select("id, slug, title, published_at, body")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (data as NewsletterIssue[]) ?? [];
}
