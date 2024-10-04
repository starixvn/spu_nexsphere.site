import type { NextAuthConfig } from 'next-auth';
import { Permission } from '@/app/lib/definitions';
import { PermissionType } from '@/app/lib/constants';

type Role = 'user' | 'mod' | 'admin';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const session = auth;

      if (pathname.startsWith('/api') || pathname === '/login' || pathname === '/unauthorized') {
        return true;
      }

      if (!session) {
        return false;
      }

      if (pathname === '/') {
        return true;
      }

      const userPermission = session.user?.permission as Permission;
      const userRole = session.user?.role as Role;

      if (userRole === 'admin') {
        return true;
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
  providers: [],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} satisfies NextAuthConfig;
