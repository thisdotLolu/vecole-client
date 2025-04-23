import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const path = request.nextUrl.pathname;
  
  if (token) {
    if (path === '/signin' || path === '/signup') {
      console.log('Authenticated user trying to access auth page, redirecting to home');
      return NextResponse.redirect(new URL('/', request.url));
    }
  } 
  else {
    if (path === '/' || path.startsWith('/dashboard') || path.startsWith('/profile')) {
      console.log('Unauthenticated user trying to access protected page, redirecting to signin');
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup']
};