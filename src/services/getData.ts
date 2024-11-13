import axios from "axios";
import { LoginRequest, UserInfo } from "../initial-data/definitions";

export async function login(loginRequest: LoginRequest): Promise<UserInfo | undefined> {
    try {
        const url = `http://localhost:3000/api/users`;
        const response = await axios.get(url);
        const data = response.data;
        console.log('data', data);

        const user: UserInfo = {
            id: data.id,
            username: data.username,
            // email: data.email,
            // name: data.name,
            // password: data.password,
            role: data.role,
            permission: data.permission
        };

        return user;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch users.');
    }
}