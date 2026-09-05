-- ---------------------------------------------------------------------------
-- A counter, so the public forms cannot be submitted a thousand times.
--
-- HOW TO RUN THIS: in the Supabase dashboard, open the SQL Editor, paste the
-- whole file, and press Run. Safe to run twice.
--
-- WHY THIS EXISTS
--
-- Signing in has always been limited: five codes an address, an hour. The two
-- forms anyone on the internet can reach had nothing at all. A script pointed
-- at the application form could have filled the applications table, and the
-- CRM behind it, as fast as it could post.
--
-- Counting rows in `applications` would have been the obvious way to do it and
-- would not have worked, because it can only count what it can see: a script
-- that changes the email address on every request looks like a hundred
-- different people. What has to be counted is the connection, not the answer.
--
-- WHY THE KEY IS A HASH
--
-- The thing being counted is an IP address, which is personal data. Kept in
-- clear it would make this table a log of who visited the site and when, which
-- is a worse thing to hold than the problem it solves.
--
-- So nothing here is reversible. The application hashes the IP with the server
-- secret before it ever arrives, and only the hash is stored. It answers "have
-- I seen this one already today" and cannot answer "who was it".
--
-- Rows are deleted as soon as they are older than the window they were counted
-- in, so this table never holds more than the last hour rather than growing
-- forever.
-- ---------------------------------------------------------------------------

create table if not exists public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  -- Which limit this row counts against: "application", "signup".
  bucket text not null,
  -- HMAC of whatever is being counted. Never an address in clear.
  key_hash text not null,
  created_at timestamptz not null default now()
);

-- The only question ever asked of this table is "how many rows in this bucket,
-- for this key, since this moment", and the only other statement is a delete by
-- age. This covers both.
create index if not exists rate_limits_lookup
  on public.rate_limits (bucket, key_hash, created_at desc);

alter table public.rate_limits enable row level security;

-- Deliberately no policies, the same as every other table here. With RLS on and
-- nothing granting access, the anon key cannot read or write a single row; the
-- service key used by the server bypasses RLS and is the only way in.
