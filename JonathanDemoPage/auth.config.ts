import type { NextAuthConfig } from 'next-auth';
import { Permission } from '@/app/lib/definitions';
import { PermissionType } from '@/app/lib/constants';

// Định nghĩa các vai trò
type Role = 'user' | 'mod' | 'admin';

// Hàm kiểm tra quyền truy cập
export const authConfig = {
  pages: {
    signIn: '/login', // Trang đăng nhập
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const session = auth;

      // Cho phép truy cập công khai vào trang đăng nhập, trang unauthorized và API routes
      if (pathname.startsWith('/api') || pathname === '/login' || pathname === '/unauthorized') {
        return true;
      }

      // Kiểm tra xem người dùng đã đăng nhập chưa
      if (!session) {
        return false;
      }

      // Cho phép tất cả các vai trò truy cập trang chủ
      if (pathname === '/') {
        return true;
      }

      const userPermission = session.user?.permission as Permission;
      const userRole = session.user?.role as Role;

      if (userRole === 'admin') {
        return true; // Admin có quyền truy cập tất cả
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

        return hasPermission;
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      // Chuyển hướng đến / sau khi đăng nhập
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      } else {
        return baseUrl;
      }
    },
    async session({ session, token }) {
      if (session?.user && typeof token.role === 'string') {
        session.user.role = token.role;
        if (token.permission && typeof token.permission === 'object') {
          session.user.permission = token.permission as Permission;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.permission = user.permission as Permission;
      }
      return token;
    },
  },
  providers: [], // Thêm các provider sau
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },
} satisfies NextAuthConfig;
