"use client";

import SectionWrapper from '@/components/custom/SectionWrapper';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function CustomerDetailsForm({ children }: Readonly<{ children: React.ReactNode }>) {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        if (searchParams.has('form')) {
            const form = searchParams.get('form');
            console.log(form);
        }
    }, [pathname, searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bodyContents = Object.fromEntries(new FormData(e.currentTarget).entries());
        console.log(bodyContents);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Details Submitted!",
                description: "Your details have been submitted successfully. We will get back to you soon.",
            });
        }, 2000);
    }

    return (
        <SectionWrapper>
            <div className='bg-[url("/assets/gallery-1.jpg")] bg-cover bg-center text-center rounded-lg h-[30rem] text-background'>
                <div className='rounded-lg bg-gradient-to-b from-black/60 to-transparent h-full flex items-center justify-center text-3xl'>
                    <p>Share insights about your present bathroom</p>
                </div>
            </div>
            <form className='mt-20 relative' onSubmit={handleSubmit}>
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
