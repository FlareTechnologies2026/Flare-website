import { NextRequest, NextResponse } from 'next/server'
import { getVacancies, addVacancy } from '@/lib/vacancyStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// GET — public: returns only open vacancies. Admin gets all.
export async function GET(req: NextRequest) {
  const admin = isAdmin(req)
  const vacancies = await getVacancies(!admin)
  return NextResponse.json(vacancies)
}

// POST — admin only: create a new vacancy
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const {
    title, department, location, type, experience, salary,
    about_role, responsibilities, qualifications, nice_to_have,
    benefits, apply_link, open,
  } = body

  if (!title) {
    return NextResponse.json({ error: 'Vacancy title is required' }, { status: 400 })
  }

  const entry = await addVacancy({
    title,
    department: department || '',
    location: location || '',
    type: type || '',
    experience: experience || '',
    salary: salary || '',
    about_role: about_role || '',
    responsibilities: responsibilities || '',
    qualifications: qualifications || '',
    nice_to_have: nice_to_have || '',
    benefits: benefits || '',
    apply_link: apply_link || '',
    open: open ?? true,
  })

  return NextResponse.json(entry, { status: 201 })
}
