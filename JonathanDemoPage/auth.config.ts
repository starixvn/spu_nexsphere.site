import type { NextAuthConfig } from 'next-auth';

// Định nghĩa các vai trò
type Role = 'user' | 'mod' | 'admin';

// Định nghĩa quyền truy cập cho từng vai trò
const roleAccess: Record<Role, string[]> = {
  user: ['/dashboard', '/report'],
  mod: ['/dashboard', '/report', '/invoices'],
  admin: ['/dashboard', '/report', '/invoices', '/admin'],
};

// Hàm kiểm tra quyền truy cập
function hasAccess(role: Role, pathname: string): boolean {
  return roleAccess[role].some(path => pathname.startsWith(path));
}

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
      const userRole = (auth?.user?.role as Role) || 'user';
      const isRoot = pathname === '/';
  
      if (isRoot) {
        return isLoggedIn;
      }
  
      if (isLoggedIn) {
        return hasAccess(userRole, pathname);
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
