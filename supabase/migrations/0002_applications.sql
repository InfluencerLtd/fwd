-- ---------------------------------------------------------------------------
-- Membership applications.
--
-- HOW TO RUN THIS: in the Supabase dashboard, open the SQL Editor, paste the
-- whole file, and press Run. Run 0001 first if you have not already.
-- ---------------------------------------------------------------------------

create type application_group as enum ('brand', 'creator', 'platform', 'industry');
create type application_status as enum ('pending', 'accepted', 'declined');

create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),

  -- What the applicant told us.
  name         text not null,
  email        text not null,
  role         text not null,
  company      text not null,
  group_type   application_group not null,
  market       text not null,
  link         text,
  reason       text not null,

  -- Proof of consent to be emailed, and when. Needed for GDPR.
  consented    boolean not null default false,
  consented_at timestamptz,

  -- Where the club team takes it from here.
  status       application_status not null default 'pending',
  decided_at   timestamptz,
  decided_by   text,

  -- HubSpot. The application is saved here FIRST and pushed to HubSpot after.
  -- If HubSpot is down, synced_at stays null and last_error records why, so the
  -- application is never lost and can be retried. Nothing about the applicant
  -- depends on HubSpot succeeding.
  hubspot_synced_at timestamptz,
  hubspot_attempts  integer not null default 0,
  hubspot_last_error text,

  created_at   timestamptz not null default now()
);

-- One application per email address. Applying twice updates the first.
create unique index if not exists applications_email_key
  on public.applications (lower(email));

-- Lets the club team pull the ones still waiting on a decision, quickly.
create index if not exists applications_status_idx
  on public.applications (status, created_at desc);

-- Finds everything that still needs pushing to HubSpot, for the retry job.
create index if not exists applications_hubspot_pending_idx
  on public.applications (created_at)
  where hubspot_synced_at is null;

-- ---------------------------------------------------------------------------
-- Row level security.
--
-- Same as the signups table, and for a stronger reason: this table contains the
-- names, employers and email addresses of senior people at real companies.
-- RLS is on and there are NO policies, so the anonymous and authenticated roles
-- can do nothing with it at all. Every read and write goes through the server
-- using the service role key.
-- ---------------------------------------------------------------------------

alter table public.applications enable row level security;
