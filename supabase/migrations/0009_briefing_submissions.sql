-- ---------------------------------------------------------------------------
-- What members send in for the briefing.
--
-- HOW TO RUN THIS: in the Supabase dashboard, open the SQL Editor, paste the
-- whole file, and press Run. After 0001-0008. Safe to run twice.
--
-- THE COLUMN THAT MATTERS IS `attributable`, AND ITS DEFAULT IS FALSE.
--
-- Everything sent in here is off the record unless the sender said otherwise.
-- That is not a setting somebody has to find: the box on the form starts
-- empty, so a submission that arrives with nobody having thought about it at
-- all arrives anonymous. The default in the database says the same thing, so a
-- row written by anything other than the form — a fix-up by hand, an import
-- later — lands on the same side of the line.
--
-- `not null` rather than a nullable boolean on purpose. Three states would
-- mean "yes", "no" and "we never asked", and the third one is exactly the
-- ambiguity somebody would eventually resolve in the wrong direction.
--
-- NOTHING HERE IS EVER SHOWN ON THE SITE. There is no public read path to this
-- table and no page that lists it. It is read by the people writing the
-- briefing, and what reaches print is a decision a person makes.
-- ---------------------------------------------------------------------------

create table if not exists public.briefing_submissions (
  id           uuid primary key default gen_random_uuid(),

  name         text not null,
  email        text not null,
  -- One line. What this is about.
  subject      text not null,
  -- The submission itself.
  message      text not null,

  -- Whether we may put their name to it. See the note above.
  attributable boolean not null default false,

  created_at   timestamptz not null default now()
);

create index if not exists briefing_submissions_created_idx
  on public.briefing_submissions (created_at desc);

-- Locked shut, like every other table here. No policies, so nothing reaches it
-- except the server with the service key, after it has decided who is asking.
alter table public.briefing_submissions enable row level security;
