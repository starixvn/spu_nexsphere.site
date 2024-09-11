import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!session && !pathname.startsWith('/api') && pathname !== '/login' && pathname !== '/unauthorized') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu không có quyền truy cập, chuyển hướng đến trang unauthorized
  if (session && !session.user) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};