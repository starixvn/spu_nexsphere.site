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
  
      const isLoggedIn = !!auth?.user;
      const pathsRequiringAuth = [/^\/dashboard(\/.*)?$/, /^\/report(\/.*)?$/, /^\/invoices(\/.*)?$/];
      const isRoot = pathname === '/';
  
      const isNeedAuth = pathsRequiringAuth.some((regex) => regex.test(pathname));
  
      if (isRoot || isNeedAuth) {
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
    async session({ session, token }) {
      if (session?.user && typeof token.role === 'string') {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [], // Thêm các provider sau
} satisfies NextAuthConfig;
