"use client";

import OTPInput from '@/components/custom/OTPInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const bodyContent = Object.fromEntries(new FormData(e.currentTarget));
        bodyContent.otp = otp.join('');
        /* console.log(bodyContent); */
        setTimeout(() => setLoading(false), 2000);
    };

        return (
        <>
            <div className={cn('absolute inset-0 bg-black/80 z-50 cursor-wait', {
                'hidden': !loading,
                'grid place-content-center': loading
            })}>
                <AiOutlineLoading3Quarters className='animate-spin text-5xl text-primary' />
            </div>
            <form
                className='bg-white px-6 py-8 rounded-lg max-w-md w-full mx-auto flex flex-col gap-4'
                onSubmit={handleLogin}
            >
                <h1 className='heading-1 text-center mb-4'>Welcome back</h1>
                <label htmlFor="email">
                    <p className='ml-1 mb-1 font-semibold'>Email ID</p>
                    <Input name="email" type='email' inputMode='email' placeholder='Enter your email' />
                </label>
                <div className='grid grid-cols-[1fr_2rem_1fr] w-[80%] mt-4 mb-2 mx-auto'>
                    <div className='bg-black/20 w-full h-0.5 self-center' />
                    <p className='text-center'>or</p>
                    <div className='bg-black/20 w-full h-0.5 self-center' />
                </div>
                <label htmlFor="phone">
                    <p className='ml-1 mb-1 font-semibold'>Phone number</p>
                    <Input name="phone" type='text' inputMode='numeric' placeholder='Enter your phone number' maxLength={10} minLength={10} />
                </label>
                <OTPInput value={otp} setValue={setOtp} />
                <Button>Log In</Button>
                <p className='text-center'>Don&apos;t have an account? <Link href='/auth/signup' className='text-primary underline'>Sign Up</Link></p>
            </form>
        </>
    )
}
