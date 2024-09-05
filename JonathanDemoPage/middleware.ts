import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { Permission } from '@/app/lib/definitions';

// Định nghĩa ánh xạ giữa đường dẫn và quyền
const pathPermissionMap: { [key: string]: string } = {
  '/invoices': 'invoices',
  '/dashboard': 'dashboard',
  '/report': 'report',
  // Thêm các đường dẫn khác ở đây
};

async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  console.log('middleware session', session);

  // Cho phép truy cập công khai vào trang đăng nhập, trang unauthorized và API routes
  if (pathname.startsWith('/api') || pathname === '/login' || pathname === '/unauthorized') {
    return NextResponse.next();
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Cho phép tất cả các vai trò truy cập trang chủ
  if (pathname === '/') {
    return NextResponse.next();
  }
  // Kiểm tra quyền truy cập dựa trên permission của người dùng
  const userPermission = session.user?.permission as Permission;
  const userRole = session.user?.role;

  if (userRole === 'admin') {
    return NextResponse.next(); // Admin có quyền truy cập tất cả
  }

  if (userPermission) {
    const requiredPermission = Object.keys(pathPermissionMap).find(path => pathname.startsWith(path));
    if (requiredPermission) {
      const permission = pathPermissionMap[requiredPermission];
      if (userPermission[permission]?.includes('view')) {
        return NextResponse.next();
      }
    }
  }

  // Chuyển hướng đến trang không có quyền truy cập
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

// Kết hợp middleware của NextAuth với middleware tùy chỉnh
export default middleware;

// Cập nhật config để áp dụng middleware cho các đường dẫn cần kiểm tra
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};