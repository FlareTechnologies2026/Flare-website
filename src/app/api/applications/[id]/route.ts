import { NextRequest, NextResponse } from 'next/server'
import { deleteApplication } from '@/lib/applicationStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// DELETE — admin only: remove an application
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const ok = await deleteApplication(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
