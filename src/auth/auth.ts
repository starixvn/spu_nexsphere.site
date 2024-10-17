import NextAuth from 'next-auth';
import { authConfig } from '@/src/auth/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { LoginRequest, User } from '@/src/initial-data/definitions';
import { login } from '@/src/services/getData';

async function getUser1(username: string): Promise<User | null> {
    try {
        const user: User = {
            id: 1,
            username: "data.username",
            role: "data.role",
            permission: "data.permission"
        };
        return user || null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const loginRequest: LoginRequest = {
                        userName: "user",
                        password: password
                    };

                    const loginResponse = await login(loginRequest);
                    return loginResponse || null;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});