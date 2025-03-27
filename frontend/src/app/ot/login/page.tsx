"use client";

import OTPInput from '@/components/custom/OTPInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const cookies = useCookies();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (otp.join("").length !== 4) {
                toast({
                    description: 'Please enter a valid OTP',
                    variant: 'destructive'
                });
                return;
            }

            if ((!emailRef.current?.value && !phoneRef.current?.value)) {
                toast({
                    description: 'Please enter either email or phone number',
                    variant: 'destructive'
                });
                return;
            }

            setLoading(true);
            const bodyContent = Object.fromEntries(new FormData(e.currentTarget));
            bodyContent.otp = otp.join('');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/auth/login`, {
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

                // Remove all cookies
                cookies?.remove('token');
                cookies?.remove("adminToken");
                cookies?.remove("otToken");
                cookies?.remove("devId");

                cookies?.set('otToken', data.token, 15);
                router.push("/ot");
            } else {
                toast({
                    description: 'Error logging in! Please try again later.',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            setLoading(false);
            console.log('Error logging in:', error);
            toast({
                description: 'Error logging in! Please try again later.',
                variant: 'destructive'
            });
        }
    };

    const sendOTP = async () => {
        try {
            if (!emailRef.current?.value && !phoneRef.current?.value) {
                toast({
                    description: 'Please enter either email or phone number',
                    variant: 'destructive'
                });
                return;
            }

            setLoading(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/auth/login/otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailRef.current?.value })
            });
            const data = await response.json();
            setLoading(false);
            toast({
                description: data.message,
            });
        } catch (error) {
            setLoading(false);
            console.log('Error sending OTP:', error);
            toast({
                description: 'Error sending OTP! Please try again later.',
                variant: 'destructive'
            });
        }
    };

    return (
        <section className='flex items-center justify-center h-screen bg-[url("/assets/auth/adminLogin.png")] bg-cover bg-no-repeat bg-center'>
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
                    <Input ref={emailRef} name="email" type='email' inputMode='email' placeholder='Enter your email' />
                </label>
                <div className='grid grid-cols-[1fr_2rem_1fr] w-[80%] mt-4 mb-2 mx-auto'>
                    <div className='bg-black/20 w-full h-0.5 self-center' />
                    <p className='text-center'>or</p>
                    <div className='bg-black/20 w-full h-0.5 self-center' />
                </div>
                <label htmlFor="phone">
                    <p className='ml-1 mb-1 font-semibold'>Phone number</p>
                    <Input ref={phoneRef} name="phone" type='text' inputMode='numeric' placeholder='Enter your phone number' maxLength={10} minLength={10} />
                </label>
                <OTPInput value={otp} setValue={setOtp} sendOTP={sendOTP} />
                <Button>Log In</Button>
            </form>
        </section>
    )
}
