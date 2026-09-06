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
