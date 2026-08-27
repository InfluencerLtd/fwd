-- ---------------------------------------------------------------------------
-- Waitlist and holding-page email capture.
--
-- HOW TO RUN THIS: in the Supabase dashboard, open the SQL Editor, paste the
-- whole file, and press Run. It only needs doing once.
-- ---------------------------------------------------------------------------

create table if not exists public.signups (
  id            uuid primary key default gen_random_uuid(),
  email         text        not null,
  -- Where the person signed up, so we can tell holding-page sign-ups apart
  -- from waitlist sign-ups later on.
  source        text        not null default 'holding',
  -- Proof that they ticked the consent box, and when. Needed for GDPR.
  consented     boolean     not null default false,
  consented_at  timestamptz,
  -- Set when the person unsubscribes. We keep the row so we can honor it.
  unsubscribed_at timestamptz,
  created_at    timestamptz not null default now()
);

-- One row per email address. A second sign-up updates the first rather than
-- creating a duplicate, so the list stays clean.
create unique index if not exists signups_email_key
  on public.signups (lower(email));

-- ---------------------------------------------------------------------------
-- Row level security.
--
-- This table is locked shut. Nothing reachable from a browser can read it, and
-- nothing can write to it either. All writes go through the server, which uses
-- the service role key and bypasses these policies. That key lives only in the
-- environment and never reaches a visitor's browser.
--
-- The effect: the email list cannot be scraped, listed, or enumerated by
-- anyone who finds the public API address.
-- ---------------------------------------------------------------------------

alter table public.signups enable row level security;

-- Deliberately no policies. With RLS on and no policy granting access, the
-- anonymous and authenticated roles can do nothing at all with this table.
