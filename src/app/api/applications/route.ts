import { NextRequest, NextResponse } from 'next/server'
import { getApplications } from '@/lib/applicationStore'

function isAdmin(req: NextRequest): boolean {
  return req.cookies.get('flare_admin')?.value === '1'
}

// GET — admin only: list all applications
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const applications = await getApplications()
  return NextResponse.json(applications)
}
