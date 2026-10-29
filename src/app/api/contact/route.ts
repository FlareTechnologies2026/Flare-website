import { NextRequest, NextResponse } from 'next/server'

const TO = process.env.CONTACT_TO || 'marketing@flaretechnologies.in'
const FROM = process.env.CONTACT_FROM || 'Flare Website <onboarding@resend.dev>'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: bots fill this hidden field. Pretend success and drop it.
  if (clean(body['bot-field'], 100)) return NextResponse.json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const company = clean(body.company, 160)
  const service = clean(body.service, 120)
  const message = clean(body.message, 4000)

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Name and a valid email are required' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email is not configured' }, { status: 500 })
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Company', company || '—'],
    ['Looking for', service || '—'],
    ['Message', message || '—'],
  ]
  const html = rows
    .map(([k, v]) => `<p><strong>${k}:</strong><br>${esc(v).replace(/\n/g, '<br>')}</p>`)
    .join('')
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New strategy call request: ${name}${company ? ` (${company})` : ''}`,
      html,
      text,
    }),
  })

  if (!res.ok) {
    console.error('contact: Resend error', res.status, await res.text())
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
