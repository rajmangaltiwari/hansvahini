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
