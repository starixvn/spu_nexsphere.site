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
    let currentPath = '';
    let hasPermission = false;

    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += (i > 0 ? '/' : '') + pathSegments[i];
      const userPermissionForPath = userPermission[currentPath];

      if (userPermissionForPath) {
        const permissionTypes = userPermissionForPath.split(',');
        const isCreateRoute = pathSegments.includes('create');
        const isEditRoute = i === pathSegments.length - 1 && pathSegments[i] !== 'create';
        const isViewRoute = i === pathSegments.length - 1;

        if (permissionTypes.includes(PermissionType.FULL_ACCESS)) {
          hasPermission = true;
          break;
        }
        if ((isCreateRoute || isEditRoute) && permissionTypes.includes(PermissionType.CREATE)) {
          hasPermission = true;
          break;
        }
        if (isViewRoute && permissionTypes.includes(PermissionType.VIEW)) {
          hasPermission = true;
          break;
        }
      }
    }

    if (hasPermission) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/unauthorized', request.url));
}

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};