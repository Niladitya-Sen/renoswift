"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const cookies = useCookies();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            const bodyContent = Object.fromEntries(new FormData(e.currentTarget));

            console.log(bodyContent);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyContent)
            });
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                toast({
                    description: 'Login successful!',
                });
                cookies.set('adminToken', data.token, 30);
                router.push("/admin");
            } else {
                toast({
                    description: 'Error logging in! Please try again later.',
                    variant: 'destructive'
                });
            }
            console.log(data);
        } catch (error) {
            setLoading(false);
            console.log('Error logging in:', error);
            toast({
                description: 'Error logging in! Please try again later.',
                variant: 'destructive'
            });
        }
    };


    return (
        <section className='admin flex items-center justify-center h-screen bg-[url("/assets/auth/adminLogin.png")] bg-cover bg-no-repeat bg-center'>
            <div className={cn('absolute inset-0 bg-black/80 z-50 cursor-wait', {
                'hidden': !loading,
                'grid place-content-center': loading
            })}>
                <AiOutlineLoading3Quarters className='animate-spin text-5xl text-primary' />
            </div>
            <form
                className='bg-white px-6 py-8 rounded-lg max-w-md w-full mx-auto flex flex-col justify-between gap-4 h-[25rem]'
                onSubmit={handleLogin}
            >
                <h1 className='heading-1 text-center mb-4'>Welcome back</h1>
                <label htmlFor="email">
                    <p className='ml-1 mb-1 font-semibold'>Email ID</p>
                    <Input ref={emailRef} name="email" type='email' inputMode='email' placeholder='Enter your email' />
                </label>
                <label htmlFor="password">
                    <p className='ml-1 mb-1 font-semibold'>Password</p>
                    <Input ref={phoneRef} name="password" type='password' />
                </label>
                <Button>Log In</Button>
            </form>
        </section>
    )
}
