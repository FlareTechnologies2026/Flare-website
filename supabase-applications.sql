-- Run this in your Supabase SQL editor.
-- Creates the applications table and sets up the resumes storage bucket.

-- 1. Applications table
create table if not exists applications (
  id               uuid primary key default gen_random_uuid(),
  vacancy_id       text  not null,
  vacancy_title    text  not null,
  name             text  not null,
  email            text  not null,
  phone            text  not null default '',
  cover_note       text  not null default '',
  resume_url       text  not null,
  resume_filename  text  not null,
  applied_at       timestamptz not null default now()
);

-- RLS: only service role (server-side) can read/write
alter table applications enable row level security;
-- No public policies — all access goes through the API routes which use
-- the service role key and enforce cookie-based admin auth.

-- 2. Storage bucket for resumes (run once)
-- Go to Storage in Supabase dashboard and create a bucket named "resumes"
-- Set it to PRIVATE (not public).
-- Then add this policy so the service role key can upload:
--   Name:  "Service role upload"
--   Allowed operations: INSERT, SELECT
--   Policy definition: (auth.role() = 'service_role')
--
-- OR just create it via dashboard:
--   Bucket name: resumes
--   Public: OFF
--   File size limit: 5242880 (5 MB)
--   Allowed MIME types: application/pdf
