import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { Permission } from '@/app/lib/definitions';
import { PermissionType } from '@/app/lib/constants';

async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

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
    const pathSegments = pathname.split('/').filter(Boolean);

    let requiredPermission = pathSegments[0];
    if (requiredPermission) {
      const userPermissionForPath = userPermission[requiredPermission];
      const isCreateRoute = pathSegments[1] === 'create';
      const isEditRoute = pathSegments.length > 1 && pathSegments[1] !== 'create';
      const isMainPage = pathSegments.length === 1;

      if (userPermissionForPath) {
        if (userPermissionForPath.includes(PermissionType.FULL_ACCESS)) {
          return NextResponse.next();
        }
        if ((isCreateRoute || isEditRoute) && userPermissionForPath.includes(PermissionType.CREATE)) {
          return NextResponse.next();
        }
        if ((isMainPage && userPermissionForPath.includes(PermissionType.VIEW))) {
          return NextResponse.next();
        }
      }
    }
  }

  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};