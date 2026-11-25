import { NextRequest, NextResponse } from 'next/server'
import { getCases, addCase, type CaseStudy } from '@/lib/caseStore'

/** Check if the request is from an authenticated admin */
function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// GET — public: list all case studies
export async function GET() {
  const cases = await getCases()
  return NextResponse.json(cases)
}

// POST — admin only: create a new case study
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { sector, client, logo, title, body: text, stats, link } = body

  // Basic validation
  if (!sector || !client || !title || !text || !link) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const entry = await addCase({
    sector,
    client,
    logo: logo || undefined,
    title,
    body: text,
    stats: stats || [],
    link,
  })

  return NextResponse.json(entry, { status: 201 })
}
