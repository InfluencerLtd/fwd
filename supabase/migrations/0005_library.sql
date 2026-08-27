-- ---------------------------------------------------------------------------
-- The members' library: research, white papers, event recaps, briefings and
-- any other written piece.
--
-- HOW TO RUN THIS: Supabase dashboard, SQL Editor, paste, Run. After 0001-0004.
--
-- ONE DESIGN DECISION WORTH EXPLAINING, because it is the whole point of this
-- table:
--
--   `kind` is a plain text column, NOT one of the fixed lists used elsewhere in
--   this schema.
--
--   The brief asks that adding a new type of content later should not mean
--   rebuilding anything. A fixed database list would mean a database change
--   every time the club invents a new kind of piece. A text column means the
--   list of kinds lives in the code, in src/lib/library-kinds.ts, and adding
--   one is a single line there with no database change at all.
--
--   The trade is that the database will not reject a nonsense kind. The code
--   checks it on the way in instead, and anything unrecognised is shown under
--   its own name rather than crashing.
-- ---------------------------------------------------------------------------

create table if not exists public.content_items (
  id           uuid primary key default gen_random_uuid(),

  -- What sort of thing this is. See src/lib/library-kinds.ts.
  kind         text not null default 'research',
  -- The part of the web address, e.g. "creator-economy-2027".
  slug         text not null,

  title        text not null,
  -- One or two lines, shown in the list.
  summary      text not null default '',
  -- The piece itself, for anything written to be read on the site.
  body         text not null default '',

  -- Free text, so the club team can group things however it wants without
  -- anybody having to change the code. Shown as a filter in the library.
  category     text not null default '',

  -- A file to download, held in a PRIVATE Supabase Storage bucket.
  -- This is the path inside the bucket, never a public web address: the server
  -- turns it into a short-lived signed link for a signed-in member each time.
  -- A public address would be shareable outside the club, which would defeat
  -- the point of gating the library at all.
  file_path    text,
  file_name    text,
  file_size    integer,

  published_at timestamptz,
  is_published boolean not null default false,

  is_dummy     boolean not null default false,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create unique index if not exists content_items_slug_key
  on public.content_items (slug);

create index if not exists content_items_listing_idx
  on public.content_items (is_published, published_at desc);

create index if not exists content_items_kind_idx
  on public.content_items (kind);

-- Same as every other table here: locked shut, no policies, all access through
-- the server after it has checked who is signed in.
alter table public.content_items enable row level security;
