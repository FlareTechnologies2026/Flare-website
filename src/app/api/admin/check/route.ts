import { NextRequest, NextResponse } from 'next/server'

// Check if the current session is authenticated
export async function GET(req: NextRequest) {
  if (req.cookies.get('flare_admin')?.value === '1') {
    return NextResponse.json({ authed: true })
  }
  return NextResponse.json({ authed: false }, { status: 401 })
}
