import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifyCustomer(token: string): Promise<{ verified: boolean, message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify/customer`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { verified: false, message: "User not verified" };
    }
}

async function verifyOT(token: string): Promise<{ verified: boolean, message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify/ot`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { verified: false, message: "User not verified" };
    }
}

async function verifyAdmin(token: string): Promise<{ verified: boolean, message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { verified: false, message: "User not verified" };
    }
}

export async function middleware(request: NextRequest) {
    /* const token = request.cookies.get('token')?.value;
    const adminToken = request.cookies.get('adminToken')?.value;
    const otToken = request.cookies.get('otToken')?.value;

    const response = NextResponse.next();

    if (request.nextUrl.pathname.includes("/customer") && !request.nextUrl.pathname.includes("/login") && !request.nextUrl.pathname.includes("/admin") && !request.nextUrl.pathname.includes("/ot")) {
        if (!token) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth/login`);
        }

        const verified = await verifyCustomer(token);

        if (!verified.verified) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth/login`);
        } else {
            return response;
        }
    } else if (request.nextUrl.pathname.includes("/admin") && !request.nextUrl.pathname.includes("/login")) {
        if (!adminToken) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login`);
        }

        const verified = await verifyAdmin(adminToken);

        if (!verified.verified) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/admin/login`);
        } else {
            return response;
        }
    } else if (request.nextUrl.pathname.includes("/ot") && !request.nextUrl.pathname.includes("/login")) {
        if (!otToken) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/ot/login`);
        }

        const verified = await verifyOT(otToken);

        if (!verified.verified) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/ot/login`);
        } else {
            return response;
        }
    } else {
        return response;
    } */

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
}
