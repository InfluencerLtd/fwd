-- ---------------------------------------------------------------------------
-- Fixes the unique indexes on email so that saving actually works.
--
-- HOW TO RUN THIS: in the Supabase dashboard, open the SQL Editor, paste the
-- whole file, and press Run. Safe to run twice.
--
-- WHAT WAS WRONG
--
-- signups, applications and members each had a unique index on `lower(email)`.
-- That is a perfectly good index, and it enforced exactly what was wanted: one
-- row per address, whatever case somebody typed.
--
-- But the code saves with an upsert whose conflict target is `email`, and
-- Postgres will only accept a conflict target that matches an actual unique
-- index on those exact columns. An index on the RESULT of lower(email) is not
-- an index on email, so every one of those writes failed with:
--
--     42P10  there is no unique or exclusion constraint matching the
--            ON CONFLICT specification
--
-- Which meant no holding-page sign-up, no waitlist sign-up, no membership
-- application and no member record could ever be saved. It was invisible for
-- as long as it was, because nothing had ever been connected to a real
-- database: the migrations were checked against a real Postgres engine, but
-- nothing had ever run the app's actual write.
--
-- THE FIX, AND WHY IT IS TWO THINGS
--
-- The index becomes a plain unique index on `email`, which is what the upsert
-- needs. On its own that would quietly lose the case-insensitivity: `A@b.com`
-- and `a@b.com` would become two different people.
--
-- So a check constraint goes alongside it, requiring every address to already
-- be lowercase. Every writer in the codebase lowercases before saving, so this
-- changes nothing today. What it does is turn a future mistake from a silent
-- duplicate member into a loud, immediate error.
-- ---------------------------------------------------------------------------

-- Existing rows first. The old lower(email) index guarantees no two rows can
-- collide once lowercased, so this can never fail on a duplicate.
update public.signups      set email = lower(email) where email <> lower(email);
update public.applications set email = lower(email) where email <> lower(email);
update public.members      set email = lower(email) where email <> lower(email);

-- signups
drop index if exists public.signups_email_key;
create unique index if not exists signups_email_key
  on public.signups (email);
alter table public.signups
  drop constraint if exists signups_email_lowercase;
alter table public.signups
  add constraint signups_email_lowercase check (email = lower(email));

-- applications
drop index if exists public.applications_email_key;
create unique index if not exists applications_email_key
  on public.applications (email);
alter table public.applications
  drop constraint if exists applications_email_lowercase;
alter table public.applications
  add constraint applications_email_lowercase check (email = lower(email));

-- members
drop index if exists public.members_email_key;
create unique index if not exists members_email_key
  on public.members (email);
alter table public.members
  drop constraint if exists members_email_lowercase;
alter table public.members
  add constraint members_email_lowercase check (email = lower(email));
