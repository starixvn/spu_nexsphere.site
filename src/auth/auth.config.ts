import type { NextAuthConfig } from 'next-auth';

type Role = 'user' | 'mod' | 'admin';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      } else {
        return baseUrl;
      }
    },
    // async session({ session, token }) {
    //   if (session?.user && typeof token.role === 'string') {
    //     session.user.role = token.role;
    //   }
    //   return session;
    // },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.username = user.username;
    //     token.role = user.role;
    //   }
    //   return token;
    // },
  },
  providers: [],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
} satisfies NextAuthConfig;
