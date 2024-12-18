import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the Instatic route
  if (request.nextUrl.pathname.startsWith('/instatic')) {
    const isActivated = process.env.IST_ACTIVATED === 'true'
    
    if (!isActivated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/instatic/:path*',
}
