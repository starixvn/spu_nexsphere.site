import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (token || pathname.startsWith("/login") || pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
}

export default middleware;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};