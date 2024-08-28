import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // Trang đăng nhập
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
  
      // Kiểm tra yêu cầu favicon
      if (pathname === '/favicon.ico') return true;
  
      console.log('authorized', pathname);
  
      const isLoggedIn = !!auth?.user;
      const isRoot = pathname === '/';
      const pathsRequiringAuth = [/^\/dashboard(\/.*)?$/, /^\/report(\/.*)?$/, /^\/invoices(\/.*)?$/];
  
      const isNeedAuth = pathsRequiringAuth.some((regex) => regex.test(pathname));
  
      if (isRoot) return true;
  
      if (isNeedAuth) {
        return isLoggedIn || false;
      }
  
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Chuyển hướng đến / sau khi đăng nhập
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      } else {
        return baseUrl;
      }
    },
  },
  providers: [], // Thêm các provider sau
} satisfies NextAuthConfig;
