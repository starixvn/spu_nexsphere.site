import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // Trang đăng nhập
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isFaviconRequest = nextUrl.pathname === '/favicon.ico';
      if (isFaviconRequest) return true;

      const isLoggedIn = !!auth?.user;
      const isRoot = nextUrl.pathname === '/';
      const dashboardRegex = /^\/dashboard(\/.*)?$/;
      const reportRegex = /^\/report(\/.*)?$/;
      const isNeedAuth = dashboardRegex.test(nextUrl.pathname) 
                      || reportRegex.test(nextUrl.pathname) 
                      || nextUrl.pathname.startsWith('/home');

      // Cho phép truy cập vào root nếu đã đăng nhập
      if (isRoot || isNeedAuth) {
        if (isLoggedIn) return true;
        return false; // Redirect đến trang đăng nhập nếu chưa đăng nhập
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Chuyển hướng đến /home sau khi đăng nhập
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/home`;
      } else {
        return baseUrl;
      }
    },
  },
  providers: [], // Thêm các provider sau
} satisfies NextAuthConfig;
