"use client";

import OTPInput from '@/components/custom/OTPInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


export default function Signup() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
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
                className='bg-white px-6 py-8 rounded-lg max-w-md w-full flex flex-col gap-6 mx-auto mt-2'
                onSubmit={handleSignup}
            >
                <h1 className='heading-1 text-2xl sm:text-3xl text-center mb-4'>Create Your Account</h1>
                <label htmlFor="name">
                    <p className='ml-1 mb-1 font-semibold'>Full Name*</p>
                    <Input name="name" type='text' inputMode='text' placeholder='Enter your full name' required />
                </label>
                <label htmlFor="email">
                    <p className='ml-1 mb-1 font-semibold'>Email ID*</p>
                    <Input name="email" type='email' inputMode='email' placeholder='Enter your email' required />
                </label>
                <label htmlFor="phone">
                    <p className='ml-1 mb-1 font-semibold'>Phone number*</p>
                    <Input name="phone" type='text' inputMode='numeric' placeholder='Enter your phone number' maxLength={10} minLength={10} required />
                </label>
                <OTPInput value={otp} setValue={setOtp} />
                <Button>Sign Up</Button>
                <p className='text-center'>Already have an account? <Link href='/auth/login' className='text-primary underline'>Login</Link></p>
            </form>
        </>
    )
}
