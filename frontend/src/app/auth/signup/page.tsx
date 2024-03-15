"use client";

import OTPInput from '@/components/custom/OTPInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Signup() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (otp.join("").length !== 4) {
            toast({
                description: 'Please enter a valid OTP',
                variant: 'destructive'
            });
            return;
        }

        if (!emailRef.current?.value || !phoneRef.current?.value || !nameRef.current?.value) {
            toast({
                description: 'Please enter all the required fields',
                variant: 'destructive'
            });
            return;
        }

        setLoading(true);
        const bodyContent = Object.fromEntries(new FormData(e.currentTarget));
        bodyContent.otp = otp.join('');
        console.log(bodyContent);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
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
                description: 'Signup successful!',
            });
            router.push('/customer/welcome');
        } else {
            toast({
                description: 'Error signing up ! Please try again later.',
                variant: 'destructive'
            });
        }
        console.log(data);
    };

    const sendOTP = async () => {
        setLoading(true);

        if (!emailRef.current?.value || !phoneRef.current?.value || !nameRef.current?.value) {
            toast({
                description: 'Please enter all the required fields',
                variant: 'destructive'
            });
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailRef.current?.value, name: nameRef.current?.value })
        });
        const data = await response.json();
        setLoading(false);
        console.log(data);
        if (response.ok) {
            toast({
                description: data.message,
            });
        } else {
            toast({
                description: data.message,
                variant: 'destructive'
            });
        }
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
                    <Input ref={nameRef} name="name" type='text' inputMode='text' placeholder='Enter your full name' required />
                </label>
                <label htmlFor="email">
                    <p className='ml-1 mb-1 font-semibold'>Email ID*</p>
                    <Input ref={emailRef} name="email" type='email' inputMode='email' placeholder='Enter your email' required />
                </label>
                <label htmlFor="phone">
                    <p className='ml-1 mb-1 font-semibold'>Phone number*</p>
                    <Input ref={phoneRef} name="phone" type='text' inputMode='numeric' placeholder='Enter your phone number' maxLength={10} minLength={10} required />
                </label>
                <OTPInput value={otp} setValue={setOtp} sendOTP={sendOTP} />
                <Button>Sign Up</Button>
                <p className='text-center'>Already have an account? <Link href='/auth/login' className='text-primary underline'>Login</Link></p>
            </form>
        </>
    )
}
