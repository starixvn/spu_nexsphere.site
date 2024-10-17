import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

type Role = 'user' | 'mod' | 'admin';

async function middleware(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  if (!session 
      && !pathname.startsWith('/api') 
      && pathname !== '/login' 
      && pathname !== '/unauthorized'
      && pathname !== '/favicon.ico'
    ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && !session.user) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};