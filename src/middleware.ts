import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
  const isAdminApi = req.nextUrl.pathname.startsWith('/api/cases') ||
                     req.nextUrl.pathname.startsWith('/api/blog') ||
                     req.nextUrl.pathname.startsWith('/api/upload')
  const isLoginRoute = req.nextUrl.pathname === '/api/admin/login' ||
                       req.nextUrl.pathname === '/api/admin/logout' ||
                       req.nextUrl.pathname === '/api/admin/check'

  // Never block the login/logout/check routes
  if (isLoginRoute) return NextResponse.next()

  const authed = req.cookies.get('flare_admin')?.value === '1'

  // Block admin page — redirect to login
  if (isAdminPage && !authed) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Block admin-only APIs
  if (isAdminApi && !authed && req.method !== 'GET') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/cases/:path*', '/api/blog/:path*', '/api/upload/:path*'],
}
