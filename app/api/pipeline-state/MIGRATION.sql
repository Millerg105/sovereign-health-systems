-- ============================================================
-- Sovereign HQ pipeline_state — multi-device sync table
-- Run this once in Supabase SQL Editor (project idbpluahbjvctcivzjzc)
-- ============================================================

create table if not exists public.pipeline_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Enable RLS (defence-in-depth — the API route uses the service role key
-- which bypasses RLS, but RLS protects against accidental anon-key use).
alter table public.pipeline_state enable row level security;

-- Owner-only read.
drop policy if exists "pipeline_state owner read" on public.pipeline_state;
create policy "pipeline_state owner read"
  on public.pipeline_state for select
  using (auth.uid() = user_id);

-- Owner-only insert.
drop policy if exists "pipeline_state owner insert" on public.pipeline_state;
create policy "pipeline_state owner insert"
  on public.pipeline_state for insert
  with check (auth.uid() = user_id);

-- Owner-only update.
drop policy if exists "pipeline_state owner update" on public.pipeline_state;
create policy "pipeline_state owner update"
  on public.pipeline_state for update
  using (auth.uid() = user_id);

-- Owner-only delete (rarely used but consistent).
drop policy if exists "pipeline_state owner delete" on public.pipeline_state;
create policy "pipeline_state owner delete"
  on public.pipeline_state for delete
  using (auth.uid() = user_id);

-- Index updated_at for future cross-user analytics (not used today).
create index if not exists pipeline_state_updated_at_idx on public.pipeline_state (updated_at desc);
