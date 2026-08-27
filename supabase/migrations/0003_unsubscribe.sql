-- ---------------------------------------------------------------------------
-- Lets an applicant unsubscribe too, not just a holding-page sign-up.
--
-- HOW TO RUN THIS: Supabase dashboard, SQL Editor, paste, Run. After 0001/0002.
-- ---------------------------------------------------------------------------

alter table public.applications
  add column if not exists unsubscribed_at timestamptz;
