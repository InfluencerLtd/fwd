-- ---------------------------------------------------------------------------
-- Merch: members CLAIM items. They do not buy them.
--
-- HOW TO RUN THIS: Supabase dashboard, SQL Editor, paste, Run. After 0001-0005.
--
-- THERE IS NO PRICE COLUMN IN THIS FILE AND THERE SHOULD NEVER BE ONE.
-- There is no payment, no checkout and no pricing anywhere in this feature, by
-- instruction. If a price ever needs to exist, that is a decision to take
-- deliberately rather than something to add to a table because it seemed
-- missing.
--
-- ASSUMPTIONS MADE HERE, because the fulfilment process with Bespokely and the
-- customised-per-event approach were not settled when this was built. Each one
-- is cheap to change:
--
--   1. An item may or may not have sizes. A tote has none, a hoodie does.
--      `sizes` empty means the size question is not asked at all.
--   2. An item may be tied to one event, for the customised-per-event idea, or
--      to nothing at all. `event_id` is optional.
--   3. One member can claim a given item once. Claiming again edits the first
--      claim rather than creating a second.
--   4. There may or may not be a limited number. `claim_limit` empty means no
--      limit. It is a soft limit: it stops new claims, it does not reserve
--      stock, because without knowing how Bespokely works there is nothing
--      real to reserve against.
--   5. Delivery addresses are kept on the CLAIM, not on the member, because an
--      address changes and there is no reason to hold one permanently against
--      a person when it is only needed to send one thing.
-- ---------------------------------------------------------------------------

create type merch_claim_status as enum ('requested', 'sent', 'cancelled');

create table if not exists public.merch_items (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null,
  title        text not null,
  description  text not null default '',

  -- Empty means this item has no sizes and members are not asked.
  sizes        text[] not null default '{}',

  -- Optional. Set when an item belongs to one event.
  event_id     uuid references public.events (id) on delete set null,

  -- Optional. Empty means as many as people want.
  claim_limit  integer,

  -- Open means members can claim it. Closed leaves it visible but says so.
  is_open      boolean not null default true,
  -- Unpublished items are not shown to members at all.
  is_published boolean not null default false,

  is_dummy     boolean not null default false,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create unique index if not exists merch_items_slug_key on public.merch_items (slug);

alter table public.merch_items enable row level security;

-- ---------------------------------------------------------------------------
-- Claims.
--
-- This table holds home addresses of senior people at client companies, which
-- makes it the most sensitive table in the whole project. Row level security is
-- on with no policies, so nothing reachable from a browser can read it, and the
-- only screen that shows it is behind the admin gate.
-- ---------------------------------------------------------------------------

create table if not exists public.merch_claims (
  id          uuid primary key default gen_random_uuid(),
  item_id     uuid not null references public.merch_items (id) on delete cascade,
  member_id   uuid not null references public.members (id) on delete cascade,

  -- Null when the item has no sizes.
  size        text,

  -- Where to send it. Deliberately loose, because members are global and
  -- address shapes differ everywhere. One required line, the rest optional.
  recipient   text not null,
  address_1   text not null,
  address_2   text not null default '',
  city        text not null default '',
  postcode    text not null default '',
  country     text not null default '',
  note        text not null default '',

  status      merch_claim_status not null default 'requested',

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- One claim per member per item. Claiming again edits the first.
create unique index if not exists merch_claims_item_member_key
  on public.merch_claims (item_id, member_id);

create index if not exists merch_claims_item_idx
  on public.merch_claims (item_id, created_at desc);

alter table public.merch_claims enable row level security;
