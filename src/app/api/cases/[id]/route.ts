import { NextRequest, NextResponse } from 'next/server'
import { updateCase, deleteCase } from '@/lib/caseStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// PUT — admin only: update a case study
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const { sector, client, logo, title, body: text, stats, link } = body

  const updated = await updateCase(id, {
    sector,
    client,
    logo: logo || undefined,
    title,
    body: text,
    stats: stats || [],
    link,
  })

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

// DELETE — admin only: remove a case study
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const ok = await deleteCase(id)

  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
