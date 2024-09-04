import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// Định nghĩa các vai trò và quyền truy cập
type Role = 'user' | 'mod' | 'admin';

const roleAccess: Record<Role, string[]> = {
  user: ['/invoices'],
  mod: ['/dashboard', '/report', '/invoices'],
  admin: ['/dashboard', '/report', '/invoices', '/admin'],
};

async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Cho phép truy cập công khai vào trang đăng nhập, trang unauthorized và API routes
  if (pathname.startsWith('/api') || pathname === '/login' || pathname === '/unauthorized') {
    return NextResponse.next();
  }

  console.log('session', session);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Kiểm tra quyền truy cập dựa trên vai trò của người dùng
  const userRole = session.user?.role as Role;
  
  // Cho phép tất cả các vai trò truy cập trang chủ
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  if (userRole && roleAccess[userRole]) {
    const allowedPaths = roleAccess[userRole];
    if (!allowedPaths.some(path => pathname.startsWith(path))) {
      // Chuyển hướng đến trang không có quyền truy cập
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else {
    // Nếu không có vai trò hoặc vai trò không hợp lệ, chuyển hướng đến trang đăng nhập
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Kết hợp middleware của NextAuth với middleware tùy chỉnh
export default middleware;

// Cập nhật config để áp dụng middleware cho các đường dẫn cần kiểm tra
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};