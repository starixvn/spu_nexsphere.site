import userservice from "@/src/services/userservice";
import { CustomUser } from "@/src/type";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



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
          
          return await getUser(username, password);
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
  
async function getUser(username: any, password: any) : Promise<CustomUser | null> {
  let user;

  if (username === "admin" && password === "123456") {
    user = { id: "1", name: "Admin", token: "" };
  }
  if (username === "user" && password === "123456") {
    user = { id: "2", name: "User", token: "" }
  }

  if(user){
    const token = await userservice.authenticate(username, password);
    if(token){
      user.token = token;
      return user;
    }
  }

  return null;
}

  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };