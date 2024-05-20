"use client";

import SectionWrapper from '@/components/custom/SectionWrapper';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CustomerDetailsFormBodyContentsType = {
    images: File[],
    video: File,
    floorplan: File,
    brands: string[],
    budget: string,
    dimensions: string,
    issues: string,
    objective: string,
    style: string,
    timeline: string,
    specialRequests: string,
};


export default function CustomerDetailsForm({ children }: Readonly<{ children: React.ReactNode }>) {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();
    const cookies = useCookies();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const bodyContents: { [key: string]: any } = {};
        setLoading(true);

        for (const [key, value] of Object.entries(formData)) {
            if (key.includes('image')) {
                if (Object.keys(bodyContents).includes("images")) {
                    bodyContents["images"] = [...bodyContents["images"], value as File];
                } else {
                    bodyContents["images"] = [value as File];
                }
            } else if (key.includes('brand')) {
                if (Object.keys(bodyContents).includes("brands")) {
                    bodyContents["brands"] = [...bodyContents["brands"], value as string];
                } else {
                    bodyContents["brands"] = [value as string];
                }
            } else {
                bodyContents[key] = value;
            }
        }

        let count = 0;

        for (const image of bodyContents.images as File[]) {
            if (image.size === 0) {
                setLoading(false);
                toast({
                    title: "Error!",
                    description: "Please upload all the required files and try again.",
                    variant: "destructive"
                });
                return;
            }
            count++;
        }

        if ((bodyContents.video as File).size === 0  || count !== 5) {
            setLoading(false);
            toast({
                title: "Error!",
                description: "Please upload all the required files and try againn.",
                variant: "destructive"
            });
            return;
        }

        if (!bodyContents.brands) {
            setLoading(false);
            toast({
                title: "Error!",
                description: "Please select at least one brand and try again.",
                variant: "destructive"
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/details`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${cookies?.get('token')}`,
                },
                body: new FormData(e.currentTarget)
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Details Submitted!",
                    description: data.message,
                });
                setLoading(false);
                localStorage.setItem('propertyId', data.propertyId);
                router.push('/customer/quotation');
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    return (
        <SectionWrapper className='mb-10'>
            <h1 className='heading-1 text-2xl mb-10'>For estimate kindly upload your current bathroom pictures & videos</h1>
            <form className='relative' onSubmit={handleSubmit}>
                <div className={cn('absolute inset-0 bg-white/60', {
                    'hidden': !loading
                })}></div>
                {children}
                <div className='mt-10 flex items-center justify-center gap-4'>
                    <Button disabled={loading} type='reset' variant={'destructive'} size={'lg'}>Cancel</Button>
                    <Button disabled={loading} size={'lg'}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </SectionWrapper>
    )
}
