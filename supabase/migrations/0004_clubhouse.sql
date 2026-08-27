-- ---------------------------------------------------------------------------
-- The Clubhouse: members, events, invitations, RSVPs, sign-in codes.
--
-- HOW TO RUN THIS: Supabase dashboard, SQL Editor, paste the whole file, Run.
-- Run 0001 to 0003 first if you have not already.
--
-- READ THIS BEFORE CHANGING ANYTHING HERE.
-- Every table below is locked shut: row level security is on and there are NO
-- policies, so the anonymous and authenticated roles can do nothing with them
-- at all. Every read and write goes through our own server, which uses the
-- service role key and checks who is signed in first.
--
-- That matters more here than anywhere else in this project. The member
-- directory holds the names, employers and contact details of real senior
-- people at real client companies. If a policy is ever added to any of these
-- tables, it makes that directory reachable from a browser by anyone who finds
-- the public API address.
-- ---------------------------------------------------------------------------

create type member_status as enum ('active', 'paused', 'removed');
create type rsvp_response as enum ('going', 'not_going');
create type event_format as enum ('dinner', 'drinks', 'roundtable', 'webinar', 'conference');

-- ---------------------------------------------------------------------------
-- Members
-- ---------------------------------------------------------------------------

create table if not exists public.members (
  id           uuid primary key default gen_random_uuid(),

  email        text not null,
  name         text not null,
  role         text not null default '',
  company      text not null default '',
  -- Where they are. Shown in the directory and used to filter it.
  market       text not null default '',
  group_type   application_group not null,
  bio          text not null default '',
  -- A link to their photograph. Null until they upload one.
  photo_url    text,
  link         text,

  status       member_status not null default 'active',

  -- Their own choices about being contacted.
  newsletter_opt_in    boolean not null default true,
  introductions_opt_in boolean not null default true,

  -- Set when a member record is created from an accepted application, so the
  -- two can be traced to each other.
  application_id uuid references public.applications (id) on delete set null,

  -- Obvious dummy rows are flagged so they can be found and deleted in one go
  -- before real members are added. No invented person is ever left looking real.
  is_dummy     boolean not null default false,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create unique index if not exists members_email_key on public.members (lower(email));
create index if not exists members_status_idx on public.members (status);
create index if not exists members_group_idx on public.members (group_type);

alter table public.members enable row level security;

-- ---------------------------------------------------------------------------
-- Sign-in codes
--
-- Passwordless. A member types their email, we email them six digits, they type
-- them back. There are no passwords anywhere in this system.
--
-- The code itself is NEVER stored. Only a hash of it is, so a copy of this
-- table is not a way into anybody's account.
-- ---------------------------------------------------------------------------

create table if not exists public.login_codes (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  code_hash   text not null,
  expires_at  timestamptz not null,
  -- Counted so a code cannot be guessed by trying every combination.
  attempts    integer not null default 0,
  consumed_at timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists login_codes_email_idx
  on public.login_codes (email, created_at desc);

alter table public.login_codes enable row level security;

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------

create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  -- The part of the web address, e.g. "youtube-dinner-october".
  slug         text not null,

  title        text not null,
  city         text not null,
  format       event_format not null,
  description  text not null default '',
  -- Kept vague on purpose until an event is confirmed. Shown as written.
  detail       text not null default '',

  starts_at    timestamptz not null,
  ends_at      timestamptz,

  -- Some things in the calendar are not confirmed yet. A held event is shown to
  -- members as provisional rather than as a firm date.
  is_confirmed boolean not null default true,
  -- Draft events are not shown to members at all.
  is_published boolean not null default false,

  is_dummy     boolean not null default false,

  created_at   timestamptz not null default now()
);

create unique index if not exists events_slug_key on public.events (slug);
create index if not exists events_starts_idx on public.events (starts_at desc);

alter table public.events enable row level security;

-- ---------------------------------------------------------------------------
-- Invitations
--
-- One row per person invited to one event. The invitation email links to the
-- event's own address carrying a token, and that token is what lets somebody
-- look at the invitation WITHOUT signing in.
--
-- The token is not stored here. It is signed with a secret, so it proves itself
-- and does not need looking up. This row exists to record who was invited and
-- when, so the team can see it.
-- ---------------------------------------------------------------------------

create table if not exists public.invitations (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references public.events (id) on delete cascade,
  member_id  uuid not null references public.members (id) on delete cascade,
  sent_at    timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists invitations_event_member_key
  on public.invitations (event_id, member_id);

alter table public.invitations enable row level security;

-- ---------------------------------------------------------------------------
-- RSVPs
-- ---------------------------------------------------------------------------

create table if not exists public.rsvps (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references public.events (id) on delete cascade,
  member_id  uuid not null references public.members (id) on delete cascade,
  response   rsvp_response not null,
  note       text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists rsvps_event_member_key
  on public.rsvps (event_id, member_id);

alter table public.rsvps enable row level security;

-- ---------------------------------------------------------------------------
-- Meeting of Minds requests
--
-- A member asks to be introduced to another member. This goes to the CLUB TEAM.
-- It never emails the other member, and the other member is never told a
-- request was made unless the team decides to make the introduction.
-- ---------------------------------------------------------------------------

create table if not exists public.intro_requests (
  id             uuid primary key default gen_random_uuid(),
  requester_id   uuid not null references public.members (id) on delete cascade,
  target_id      uuid not null references public.members (id) on delete cascade,
  -- Why they want the introduction. This is the whole point of the benefit.
  reason         text not null,
  handled_at     timestamptz,
  created_at     timestamptz not null default now(),
  constraint intro_requests_not_self check (requester_id <> target_id)
);

create index if not exists intro_requests_open_idx
  on public.intro_requests (created_at desc) where handled_at is null;

alter table public.intro_requests enable row level security;

-- ---------------------------------------------------------------------------
-- The quarterly newsletter archive
-- ---------------------------------------------------------------------------

create table if not exists public.newsletter_issues (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  title        text not null,
  published_at timestamptz not null,
  -- The issue itself. Plain text or simple HTML, written by the club team.
  body         text not null default '',
  is_published boolean not null default false,
  created_at   timestamptz not null default now()
);

create unique index if not exists newsletter_slug_key
  on public.newsletter_issues (slug);

alter table public.newsletter_issues enable row level security;
