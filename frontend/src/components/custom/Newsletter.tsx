'use client'
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    const handleSubscribe = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/customer/subscriptionemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (response.ok) {
                toast({
                    title: result.message,
                });
                setEmail("")
            } else if (response.status === 400) {
                toast({
                    title: result.message,
                });
            } else {
                toast({
                    title: "Something went wrong, please try again.",
                });
            }
        } catch (error) {
            toast({
                title: "Something went wrong.",
            });
        }
    };

    return (
        <section className='my-20 bg-[url("/assets/gallery-1.jpg")] bg-cover bg-center h-[30rem] rounded-lg p-8 flex items-center justify-center md:justify-stretch'>
            <div className='max-w-xl w-full md:ml-16'>
                <h2 className='heading-1 text-2xl text-white'>Stay in touch!</h2>
                <p className='mt-2 text-white'>Be first to know about all new interior features!</p>
                <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-8'>
                    <Input 
                        placeholder='Enter your email address' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Button onClick={handleSubscribe}>Subscribe Now</Button>
                </div>
            </div>
        </section>
    );
}
