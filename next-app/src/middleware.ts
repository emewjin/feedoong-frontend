import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isLoginValidServerSide } from 'utils/auth'

export function middleware(request: NextRequest) {
  const isStatic = request.nextUrl.pathname.includes('/_next')
  const isLoginProcess = request.nextUrl.pathname.includes('/oauth')

  if (!isStatic && !isLoginProcess) {
    if (!isLoginValidServerSide(request)) {
      return NextResponse.rewrite(new URL('/signup', request.url))
    }
  }

  return NextResponse.next()
}
