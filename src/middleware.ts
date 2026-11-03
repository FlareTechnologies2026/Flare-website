import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Never interfere with login/logout/check routes
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/login/' ||
    pathname.startsWith('/api/admin/')
  ) {
    return NextResponse.next()
  }

  const authed = req.cookies.get('flare_admin')?.value === '1'

  // Block /admin/* — redirect to login
  if (pathname.startsWith('/admin') && !authed) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
