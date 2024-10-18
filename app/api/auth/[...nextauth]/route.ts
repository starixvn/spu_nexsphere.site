import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomUser extends User {
    id: string;
    name: string;
}

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials): Promise<CustomUser | null> {
          const { username, password } = credentials ?? {};
  
          if (username === "admin" && password === "123456") {
            return { id: "1", name: "Admin" };
          }
  
          return null;
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt", // Sử dụng JWT cho session
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };