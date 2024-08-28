import NextAuth from 'next-auth';
import { authConfig } from './app/auth/auth.config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
 
export default NextAuth(authConfig).auth;
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nếu yêu cầu đến đường dẫn gốc "/", chuyển hướng đến "/home"
  if (pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};