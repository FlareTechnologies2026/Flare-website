import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { addApplication } from '@/lib/applicationStore'

const BUCKET = 'resumes'

const clean = (v: FormDataEntryValue | null, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (clean(formData.get('bot-field'), 100)) {
    return NextResponse.json({ ok: true }) // silently drop bots
  }

  // ── Validate text fields ───────────────────────────────────────────────────
  const name         = clean(formData.get('name'),          120)
  const email        = clean(formData.get('email'),         200)
  const phone        = clean(formData.get('phone'),          40)
  const coverNote    = clean(formData.get('cover_note'),   2000)
  const vacancyId    = clean(formData.get('vacancy_id'),    100)
  const vacancyTitle = clean(formData.get('vacancy_title'), 200)

  if (!name) {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }
  if (!vacancyId || !vacancyTitle) {
    return NextResponse.json({ error: 'Invalid vacancy.' }, { status: 400 })
  }

  // ── Validate resume ────────────────────────────────────────────────────────
  const resumeFile = formData.get('resume')
  if (!resumeFile || typeof resumeFile === 'string') {
    return NextResponse.json({ error: 'A resume PDF is required.' }, { status: 400 })
  }
  const file = resumeFile as File
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are accepted.' }, { status: 400 })
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Resume must be under 5 MB.' }, { status: 400 })
  }

  // ── Upload PDF to Supabase Storage ─────────────────────────────────────────
  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const timestamp  = Date.now()
  const storagePath = `${vacancyId}/${safeName}-${timestamp}.pdf`

  let buffer: Buffer
  try {
    buffer = Buffer.from(await file.arrayBuffer())
  } catch {
    return NextResponse.json({ error: 'Could not read the uploaded file.' }, { status: 400 })
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: 'application/pdf', upsert: false })

  if (uploadError) {
    console.error('resume upload error:', uploadError)
    return NextResponse.json(
      { error: 'Resume upload failed. Please try again.' },
      { status: 500 }
    )
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  // ── Save application record ────────────────────────────────────────────────
  try {
    await addApplication({
      vacancy_id:      vacancyId,
      vacancy_title:   vacancyTitle,
      name,
      email,
      phone,
      cover_note:      coverNote,
      resume_url:      publicUrl,
      resume_filename: file.name,
    })
  } catch (dbErr) {
    console.error('application DB error:', dbErr)
    // Resume is uploaded — don't lose it. Return error so user knows.
    return NextResponse.json(
      { error: 'Application could not be saved. Please email us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
