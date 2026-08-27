/**
 * admin.ts  (server only)
 * ---------------------------------------------------------------------------
 * What the club team can read and change.
 *
 * Every function here assumes the caller has already checked that an admin is
 * signed in. That check lives in one place, `requireAdmin` in the admin pages,
 * and nothing in this file second-guesses it.
 */

import { getServiceClient } from "@/lib/supabase";
import type { MemberGroupId } from "@/lib/brand";
import type { ClubEvent } from "@/lib/store/clubhouse";

export type AdminMember = {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  market: string;
  group_type: MemberGroupId;
  status: "active" | "paused" | "removed";
  is_dummy: boolean;
  created_at: string;
};

export async function listAllMembers(): Promise<AdminMember[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("members")
    .select(
      "id, email, name, role, company, market, group_type, status, is_dummy, created_at",
    )
    .order("created_at", { ascending: false });

  return (data as AdminMember[]) ?? [];
}

export async function addMember(input: {
  name: string;
  email: string;
  role: string;
  company: string;
  market: string;
  group: MemberGroupId;
}): Promise<{ ok: boolean; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  const { error } = await supabase.from("members").upsert(
    {
      email: input.email.toLowerCase(),
      name: input.name,
      role: input.role,
      company: input.company,
      market: input.market,
      group_type: input.group,
      status: "active",
    },
    { onConflict: "email" },
  );

  return error ? { ok: false, reason: error.message } : { ok: true };
}

export async function setMemberStatus(
  memberId: string,
  status: "active" | "paused" | "removed",
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;
  const { error } = await supabase
    .from("members")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", memberId);
  return !error;
}

/* ---- Events -------------------------------------------------------------- */

export async function listAllEvents(): Promise<ClubEvent[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("events")
    .select(
      "id, slug, title, city, format, description, detail, starts_at, ends_at, is_confirmed, is_published, is_dummy",
    )
    .order("starts_at", { ascending: false });

  return (data as ClubEvent[]) ?? [];
}

export async function saveEvent(input: {
  id?: string;
  slug: string;
  title: string;
  city: string;
  format: string;
  description: string;
  starts_at: string;
  ends_at: string | null;
  is_confirmed: boolean;
  is_published: boolean;
}): Promise<{ ok: boolean; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  const row = { ...input };
  const { error } = input.id
    ? await supabase.from("events").update(row).eq("id", input.id)
    : await supabase.from("events").insert(row);

  return error ? { ok: false, reason: error.message } : { ok: true };
}

/* ---- Invitations and RSVPs ---------------------------------------------- */

export type EventAttendance = {
  member_id: string;
  name: string;
  email: string;
  invited: boolean;
  response: "going" | "not_going" | null;
};

/**
 * Who was invited to an event and what they said, in one list, so the team can
 * see at a glance who has not answered.
 */
export async function getEventAttendance(
  eventId: string,
): Promise<EventAttendance[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const [members, invites, rsvps] = await Promise.all([
    supabase
      .from("members")
      .select("id, name, email")
      .eq("status", "active")
      .order("name"),
    supabase.from("invitations").select("member_id").eq("event_id", eventId),
    supabase
      .from("rsvps")
      .select("member_id, response")
      .eq("event_id", eventId),
  ]);

  const invited = new Set((invites.data ?? []).map((i) => i.member_id));
  const answers = new Map(
    (rsvps.data ?? []).map((r) => [r.member_id, r.response as "going" | "not_going"]),
  );

  return (members.data ?? []).map((m) => ({
    member_id: m.id,
    name: m.name,
    email: m.email,
    invited: invited.has(m.id),
    response: answers.get(m.id) ?? null,
  }));
}

export async function recordInvitation(
  eventId: string,
  memberId: string,
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase.from("invitations").upsert(
    { event_id: eventId, member_id: memberId, sent_at: new Date().toISOString() },
    { onConflict: "event_id,member_id" },
  );
  return !error;
}

/* ---- Meeting of Minds --------------------------------------------------- */

export type IntroRequest = {
  id: string;
  reason: string;
  created_at: string;
  requester: { name: string; email: string } | null;
  target: { name: string; email: string } | null;
};

export async function listIntroRequests(): Promise<IntroRequest[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("intro_requests")
    .select(
      "id, reason, created_at, requester:requester_id ( name, email ), target:target_id ( name, email )",
    )
    .is("handled_at", null)
    .order("created_at", { ascending: false });

  return (data as unknown as IntroRequest[]) ?? [];
}

export async function markIntroHandled(id: string): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;
  const { error } = await supabase
    .from("intro_requests")
    .update({ handled_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}
