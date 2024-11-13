import NextAuth from "next-auth";
import { Permission } from "@/src/initial-data/definitions";

declare module "next-auth" {
    //   interface User {
    //     id: number;
    //     username: string;
    //     role: string;
    //     permission: Permission | {};
    //   }

    // interface UserInfo {
    //     username: string;
    //     role?: string
    //     permission?: Permission;
    // }
    // interface Session {
    //     user: User
    // }
}
