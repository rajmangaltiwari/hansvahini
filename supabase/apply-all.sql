-- ═══════════════════════════════════════════════════════════════════════════
-- Your Travels — full backend schema.
--
-- Paste this whole file into the Supabase SQL Editor and press Run.
-- It is the three files in supabase/migrations/ concatenated, in order, and is
-- safe to re-run: every statement is idempotent.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────
-- 0001_schema.sql
-- ─────────────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────────────────────
-- 0001_schema.sql — tables for content, leads and media.
--
-- Design note: nested arrays are JSONB, not child tables. The admin forms build
-- and consume whole records (buildDestination() / stateFrom() in
-- src/admin/destinations/CreateDestination.tsx), and nothing ever queries inside
-- an attraction or an itinerary day — they are always read with their parent.
-- Anything that IS filtered or sorted on (region, status, price,
-- destination_slug) stays a real column with an index.
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- Keeps updated_at honest without the app having to remember.
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  create type content_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

-- ─── destinations ────────────────────────────────────────────────────────────
create table if not exists destinations (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  tagline       text not null default '',
  hero_image    text not null default '',
  image         text not null default '',
  overview      text not null default '',
  blurb         text not null default '',
  best_time     text not null default '',
  difficulty    text not null default 'Easy',
  region        text not null,

  -- flat string arrays: rendered as lists, never filtered on
  highlights    text[] not null default '{}',
  experiences   text[] not null default '{}',
  travel_tips   text[] not null default '{}',
  local_food    text[] not null default '{}',

  -- nested object arrays, shape-identical to the TS types in src/data/destinations.ts
  gallery       jsonb not null default '[]'::jsonb,  -- {url, caption}[]
  attractions   jsonb not null default '[]'::jsonb,  -- {name, category, image, description, timeNeeded}[]
  things_to_do  jsonb not null default '[]'::jsonb,  -- {category, image, title, description}[]
  seasons       jsonb not null default '[]'::jsonb,  -- {season, months, note}[]
  how_to_reach  jsonb not null default '{"byAir":"","byRail":"","byRoad":""}'::jsonb,

  rating        numeric(2,1) not null default 0,
  reviews       integer not null default 0,
  trip_count    integer not null default 0,
  trending      boolean not null default false,
  badge         text,
  status        content_status not null default 'draft',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists destinations_status_idx on destinations (status);
create index if not exists destinations_region_idx on destinations (region);

drop trigger if exists destinations_updated_at on destinations;
create trigger destinations_updated_at before update on destinations
  for each row execute function set_updated_at();

-- ─── packages ────────────────────────────────────────────────────────────────
-- id is an identity column now, so the client-side Math.max(...)+1 in
-- buildPackage() goes away. slug stays the public key.
create table if not exists packages (
  id               bigint generated always as identity primary key,
  slug             text unique not null,
  title            text not null,
  destination_slug text not null references destinations(slug) on update cascade,
  destination_name text not null default '',
  region           text not null default '',
  image            text not null default '',
  categories       text[] not null default '{}',
  duration_days    integer not null default 0,
  duration_nights  integer not null default 0,
  price            integer not null default 0,
  old_price        integer,
  rating           numeric(2,1) not null default 0,
  reviews          integer not null default 0,
  group_size       text not null default '',
  difficulty       text not null default 'Easy',
  best_time        text not null default '',
  summary          text not null default '',
  overview         text not null default '',
  highlights       text[] not null default '{}',
  included         text[] not null default '{}',
  excluded         text[] not null default '{}',
  activities       text[] not null default '{}',
  itinerary        jsonb not null default '[]'::jsonb,  -- {day, title, description}[]
  badge            text,
  trending         boolean not null default false,
  status           content_status not null default 'draft',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists packages_status_idx on packages (status);
create index if not exists packages_destination_idx on packages (destination_slug);
create index if not exists packages_price_idx on packages (price);

drop trigger if exists packages_updated_at on packages;
create trigger packages_updated_at before update on packages
  for each row execute function set_updated_at();

-- ─── leads ───────────────────────────────────────────────────────────────────
do $$ begin
  create type lead_status as enum ('new', 'potential', 'converted', 'lost', 'not-answered');
exception when duplicate_object then null; end $$;

create table if not exists leads (
  id           bigint generated always as identity primary key,
  name         text not null,
  email        text not null,
  phone        text not null,
  destination  text not null default '',  -- display name, as the form submits it
  package_slug text,                      -- which package page the enquiry came from
  travel_dates text not null default '',
  travelers    text not null default '',
  message      text not null default '',
  status       lead_status not null default 'new',
  source       text not null default 'Website form',

  -- A Resend outage should be visible in the admin, not silent.
  notified_at  timestamptz,
  notify_error text,

  created_at   timestamptz not null default now()
);

create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_idx on leads (created_at desc);

create table if not exists lead_notes (
  id         bigint generated always as identity primary key,
  lead_id    bigint not null references leads(id) on delete cascade,
  status     lead_status not null,
  text       text not null,
  author     text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_idx on lead_notes (lead_id, created_at desc);

-- ─── media ───────────────────────────────────────────────────────────────────
-- size/dimensions are stored raw and formatted for display in the mapper, so the
-- numbers stay sortable.
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  url          text not null,
  storage_path text not null,   -- needed to delete the object from the bucket later
  caption      text not null default '',
  album        text not null default 'general',
  file_name    text,
  size_bytes   bigint,
  width        integer,
  height       integer,
  created_at   timestamptz not null default now()
);

create index if not exists media_album_idx on media (album);

-- ─── featured picks (replaces src/admin/featuredStore.ts) ────────────────────
create table if not exists featured_picks (
  kind     text not null check (kind in ('destination', 'package')),
  slug     text not null,
  position integer not null,
  primary key (kind, slug)
);


-- ─────────────────────────────────────────────────────────────────────
-- 0002_rls.sql
-- ─────────────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────────────────────
-- 0002_rls.sql — row level security.
--
-- The public site never writes to Supabase from the browser. Enquiries are
-- inserted server-side with the service-role key, so `anon` gets no insert
-- grant anywhere — which closes the spam hole an "anon can insert leads"
-- policy would otherwise open.
-- ─────────────────────────────────────────────────────────────────────────────

alter table destinations   enable row level security;
alter table packages       enable row level security;
alter table media          enable row level security;
alter table featured_picks enable row level security;
alter table leads          enable row level security;
alter table lead_notes     enable row level security;

-- ─── public reads: published content only ────────────────────────────────────
drop policy if exists "public reads published destinations" on destinations;
create policy "public reads published destinations" on destinations
  for select to anon using (status = 'published');

drop policy if exists "public reads published packages" on packages;
create policy "public reads published packages" on packages
  for select to anon using (status = 'published');

drop policy if exists "public reads media" on media;
create policy "public reads media" on media
  for select to anon using (true);

drop policy if exists "public reads featured" on featured_picks;
create policy "public reads featured" on featured_picks
  for select to anon using (true);

-- ─── signed-in admins: everything, drafts included ───────────────────────────
drop policy if exists "admins manage destinations" on destinations;
create policy "admins manage destinations" on destinations
  for all to authenticated using (true) with check (true);

drop policy if exists "admins manage packages" on packages;
create policy "admins manage packages" on packages
  for all to authenticated using (true) with check (true);

drop policy if exists "admins manage media" on media;
create policy "admins manage media" on media
  for all to authenticated using (true) with check (true);

drop policy if exists "admins manage featured" on featured_picks;
create policy "admins manage featured" on featured_picks
  for all to authenticated using (true) with check (true);

drop policy if exists "admins manage leads" on leads;
create policy "admins manage leads" on leads
  for all to authenticated using (true) with check (true);

drop policy if exists "admins manage lead notes" on lead_notes;
create policy "admins manage lead notes" on lead_notes
  for all to authenticated using (true) with check (true);

-- Deliberately no anon policy on leads or lead_notes: with RLS enabled and no
-- matching policy, anon is denied. Only src/lib/supabase/admin.ts (service role)
-- can write an enquiry.


-- ─────────────────────────────────────────────────────────────────────
-- 0003_storage.sql
-- ─────────────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────────────────────
-- 0003_storage.sql — the `media` bucket that uploaded photos live in.
--
-- Uploads go browser → Supabase directly, never through the Next server: see
-- the note in src/admin/imageUpload.ts. That keeps them clear of both nginx's
-- 1 MB default body limit and Vercel's 4.5 MB Server Action cap.
-- ─────────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public reads media objects" on storage.objects;
create policy "public reads media objects" on storage.objects
  for select to anon using (bucket_id = 'media');

drop policy if exists "admins write media objects" on storage.objects;
create policy "admins write media objects" on storage.objects
  for all to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

