import NextAuth from "next-auth";
import { Permission } from "@/app/lib/definitions";

declare module "next-auth" {
  interface User {
    role?: string
    permission: Permission | {};
  }
  interface Session {
    user: User
  }
}
