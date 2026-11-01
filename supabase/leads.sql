-- Intake form submissions. Run once in the Supabase SQL editor.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  industry text not null,
  services text[] not null,
  problem text not null,
  tools text,
  team_size text,
  timeline text,
  budget text
);

-- The site writes with the service-role key on the server only. No public access.
alter table public.leads enable row level security;
