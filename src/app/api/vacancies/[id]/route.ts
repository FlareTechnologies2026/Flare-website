import { NextRequest, NextResponse } from 'next/server'
import { updateVacancy, deleteVacancy } from '@/lib/vacancyStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// PUT — admin only: update a vacancy
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()

  const updated = await updateVacancy(id, {
    title: body.title,
    department: body.department || '',
    location: body.location || '',
    type: body.type || '',
    experience: body.experience || '',
    salary: body.salary || '',
    about_role: body.about_role || '',
    responsibilities: body.responsibilities || '',
    qualifications: body.qualifications || '',
    nice_to_have: body.nice_to_have || '',
    benefits: body.benefits || '',
    apply_link: body.apply_link || '',
    open: body.open ?? true,
  })

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

// DELETE — admin only: remove a vacancy
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const ok = await deleteVacancy(id)

  if (!ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
