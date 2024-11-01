import { User } from "next-auth";

interface CustomUser extends User {
    id: string;
    name: string;
    token: string;
}