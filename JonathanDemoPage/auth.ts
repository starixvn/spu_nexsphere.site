import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUser } from '@/app/lib/data';
import { store } from '@/app/redux/store';
import { userSignedIn } from '@/app/redux/features/user/sessionSlice';

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
                    const user = await getUser(email);
                    if (!user) return null;

                    //test
                    user.permission = {
                        'dashboard/overview': 'view',
                        'dashboard/statistics': 'view',
                        'invoices': 'view,create'
                    };

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        // const userCopy = { ...user };
                        // console.log('userCopy', typeof userCopy, userCopy);
                        //store.dispatch(userSignedIn(userCopy));
                        return user;
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});