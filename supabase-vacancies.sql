-- Run this in your Supabase SQL editor to create the vacancies table.

create table if not exists vacancies (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  department    text not null default '',
  location      text not null default '',
  type          text not null default '',       -- Full-time / Part-time / Contract / Internship
  experience    text not null default '',
  salary        text not null default '',
  about_role    text not null default '',
  responsibilities text not null default '',
  qualifications   text not null default '',
  nice_to_have     text not null default '',
  benefits         text not null default '',
  apply_link       text not null default '',
  open          boolean not null default true,
  created_at    timestamptz not null default now()
);

-- Allow public read of open vacancies (no auth required)
alter table vacancies enable row level security;

create policy "Public can read open vacancies"
  on vacancies for select
  using (open = true);

-- Service role key (used server-side) bypasses RLS automatically.
-- No insert/update/delete policy needed for public — the API routes enforce admin-cookie auth.
