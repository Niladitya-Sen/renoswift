"use client";

import SectionWrapper from '@/components/custom/SectionWrapper';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMapOutline } from "react-icons/io5";

export default function Quotation() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const cookies = useCookies();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const bodyContent = Object.fromEntries(new FormData(e.currentTarget));

        console.log(bodyContent);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/quotation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('token')}`,
                },
                body: JSON.stringify({
                    ...bodyContent,
                    propertyId: localStorage.getItem('propertyId')
                })
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false);
                toast({
                    description: data.message,
                });
                localStorage.removeItem('propertyId');
                router.push(`/customer/thank-you?id=${data.quotationId}`);
            } else {
                setLoading(false);
                toast({
                    description: 'Error submitting quotation request! Please try again later.',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            setLoading(false);
            toast({
                description: 'Error submitting quotation request! Please try again later.',
                variant: 'destructive'
            });
        }
    }

    return (
        <SectionWrapper>
            <h1 className='heading-1 text-2xl text-center underline decoration-primary underline-offset-4 decoration-4'>Request Quotation</h1>
            <div className={cn('absolute inset-0 bg-black/80 z-50 cursor-wait', {
                'hidden': !loading,
                'grid place-content-center': loading
            })}>
                <AiOutlineLoading3Quarters className='animate-spin text-5xl text-primary' />
            </div>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10' onSubmit={handleSubmit}>
                <label htmlFor="name" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Name</p>
                    <input name="name" type="text" id="name" className='outline-none w-full' />
                </label>
                <label htmlFor="phone" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Contact Number</p>
                    <input
                        name="phone"
                        type="text"
                        id="phone"
                        inputMode='numeric'
                        minLength={10}
                        maxLength={10}
                        className='outline-none w-full'
                        pattern='[0-9]{10}'
                    />
                </label>
                <label htmlFor="email" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Email ID</p>
                    <input name="email" type="email" id="email" inputMode='email' className='outline-none w-full' />
                </label>
                <label htmlFor="country" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Country</p>
                    <input name="country" type="text" id="country" className='outline-none w-full' />
                </label>
                <label htmlFor="state" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>State</p>
                    <input name="state" type="text" id="state" className='outline-none w-full' />
                </label>
                <label htmlFor="remodelingDate" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Expected Remodeling Date</p>
                    <input name="remodelingDate" type="date" id="remodelingDate" className='outline-none w-full' />
                </label>
                <label htmlFor="zipcode" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Zip Code</p>
                    <input name="zipcode" type="text" id="zipcode" className='outline-none w-full' />
                </label>
                <div className='hidden sm:block'></div>
                <label htmlFor="address" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <div className='text-secondary-foreground/50 font-medium'>
                        <IoMapOutline className='inline-block text-lg mr-2' />
                        Delivery Address
                    </div>
                    <textarea name="address" id="address" className='outline-none w-full min-h-[2lh]' />
                </label>
                <textarea name="specialRequest" id="specialRequest" className='outline-none border-secondary-foreground/20 border-2 rounded-lg w-full min-h-[5lh] py-2 px-4' placeholder='Send Message for Special Request (if any)' />
                <div className='flex gap-4 col-span-full items-center justify-center mt-4 mb-10'>
                    <Button size={'lg'} variant={'outline'} className={cn('border-2 border-primary text-primary')}>Back</Button>
                    <Button size={'lg'}>Send Request</Button>
                </div>
            </form>
        </SectionWrapper>
    )
}
