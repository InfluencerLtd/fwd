-- ---------------------------------------------------------------------------
-- EXAMPLE DATA, SO THE CLUBHOUSE CAN BE WALKED THROUGH BEFORE IT HAS MEMBERS.
--
-- HOW TO RUN THIS: Supabase dashboard, SQL Editor, paste, Run. After 0001-0004.
--
-- >>> THE PEOPLE IN HERE ARE NOT REAL AND MUST NEVER BE SHOWN TO ANYONE. <<<
--
-- Every one of them is called "Example Member" something, works at a made-up
-- company, and is flagged with is_dummy = true, which makes an orange EXAMPLE
-- tag appear beside their name everywhere they are shown. Nobody can mistake
-- one for a member.
--
-- No real client name is used as test data anywhere in this file, deliberately.
--
-- TO DELETE THEM ALL, before real members are added, run just this:
--
--   delete from public.members where is_dummy;
--   delete from public.events where is_dummy;
--
-- The events further down are the REAL year ahead from the club plan, so they
-- are not flagged as dummies and should be kept. Two of them are not confirmed
-- yet and are marked accordingly.
-- ---------------------------------------------------------------------------

insert into public.members
  (email, name, role, company, market, group_type, bio, is_dummy)
values
  ('example.one@example.com',   'Example Member One',   'Example Role, Marketing', 'Example Brand Company',    'London',       'brand',    'This is an example record, not a real person. It exists so the directory can be looked at before there are members in it.', true),
  ('example.two@example.com',   'Example Member Two',   'Example Role, Content',   'Example Creator Studio',   'New York',     'creator',  'This is an example record, not a real person.', true),
  ('example.three@example.com', 'Example Member Three', 'Example Role, Partnerships', 'Example Platform Inc',  'Los Angeles',  'platform', 'This is an example record, not a real person.', true),
  ('example.four@example.com',  'Example Member Four',  'Example Role, Strategy',  'Example Industry Group',   'Dubai',        'industry', 'This is an example record, not a real person. Included so the market filter has more than one thing to filter by.', true),
  ('example.five@example.com',  'Example Member Five',  'Example Role, Social',    'Example Brand Company',    'Singapore',    'brand',    'This is an example record, not a real person.', true)
on conflict do nothing;

-- ---------------------------------------------------------------------------
-- The year ahead, from the club plan. These are real and are not dummies.
--
-- Two of them are not settled yet, so is_confirmed is false and members see
-- them marked "Provisional" rather than as a firm date.
--
-- Descriptions are deliberately thin. I have not been told what these events
-- actually are, and I am not going to invent it. Fill them in from the admin.
-- ---------------------------------------------------------------------------

insert into public.events
  (slug, title, city, format, description, starts_at, ends_at, is_confirmed, is_published)
values
  ('ad-week-new-york-2026',
   'Ad Week New York',
   'New York',
   'conference',
   '[DESCRIPTION NEEDED. What is the club doing at Ad Week, and what is a member being invited to?]',
   '2026-10-05T09:00:00Z', '2026-10-08T18:00:00Z', true, true),

  ('youtube-dinner-october-2026',
   'The YouTube dinner',
   'London',
   'dinner',
   '[DESCRIPTION NEEDED. This is the first big one, so it is worth writing properly.]',
   '2026-10-14T18:30:00Z', null, true, true),

  ('profound-webinar-november-2026',
   'Webinar with Profound',
   'Online',
   'webinar',
   '[DESCRIPTION NEEDED. Not confirmed yet.]',
   '2026-11-24T16:00:00Z', null, false, true),

  ('december-drinks-2026',
   'December drinks',
   'London',
   'drinks',
   '[DESCRIPTION NEEDED. Not confirmed yet, and the date below is a placeholder.]',
   '2026-12-10T18:30:00Z', null, false, true)
on conflict (slug) do nothing;
