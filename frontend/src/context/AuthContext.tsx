"use client";

import { useCookies } from "@/hooks/useCookies";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isLogged: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookies = useCookies();
    const pathname = usePathname();
    const router = useRouter();

    const [isLogged, setIsLogged] = useState(false);

    async function verifyCustomer(token?: string): Promise<{ verified: boolean, message: string }> {
        if (!token) return { verified: false, message: "User not verified" };

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

    async function verifyOT(token?: string): Promise<{ verified: boolean, message: string }> {
        if (!token) return { verified: false, message: "User not verified" };

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

    async function verifyAdmin(token?: string): Promise<{ verified: boolean, message: string }> {
        if (!token) return { verified: false, message: "User not verified" };

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

    async function checkUser({ token, adminToken, otToken }: { token?: string, adminToken?: string, otToken?: string }) {
        if (pathname.includes("/customer") && !pathname.includes("/login") && !pathname.includes("/admin") && !pathname.includes("/ot")) {
            if (!token) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/auth/login`);
            }

            const verified = await verifyCustomer(token);

            if (!verified.verified) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/auth/login`);
            } else {
                setIsLogged(true);
            }
        } else if (pathname.includes("/admin") && !pathname.includes("/login")) {
            if (!adminToken) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/admin/login`);
            }

            const verified = await verifyAdmin(adminToken);

            if (!verified.verified) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/admin/login`);
            } else {
                setIsLogged(true);
            }
        } else if (pathname.includes("/ot") && !pathname.includes("/login")) {
            if (!otToken) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/ot/login`);
            }

            const verified = await verifyOT(otToken);

            if (!verified.verified) {
                router.replace(`${process.env.NEXT_PUBLIC_URL}/ot/login`);
            } else {
                setIsLogged(true);
            }
        } else {
            setIsLogged(true);
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (typeof document === "undefined") return;

        const token = cookies?.get('token');
        const adminToken = cookies?.get('adminToken');
        const otToken = cookies?.get('otToken');

        checkUser({ token, adminToken, otToken });

    }, [pathname, cookies]);

    return (
        <AuthContext.Provider value={{ isLogged }}>
            {
                isLogged ? children : null
            }
        </AuthContext.Provider>
    )
}