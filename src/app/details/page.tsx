"use client";

import FileInput from '@/components/custom/FileInput'
import SectionWrapper from '@/components/custom/SectionWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { AiFillInfoCircle } from "react-icons/ai";

export default function Details() {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

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
                <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 gap-y-4 gap-x-2'>
                    <div className='col-span-full flex items-center justify-between'>
                        <p className='font-semibold text-lg'>* Add Photos (min 5)</p>
                        <div className='flex items-center gap-2'>
                            <AiFillInfoCircle className='text-blue-600 text-xl' />
                            <p className='font-semibold'>Fields marked * are mandatory.</p>
                        </div>
                    </div>
                    <FileInput name="1" id="1" accept='image/*' />
                    <FileInput name="2" id="2" accept='image/*' />
                    <FileInput name="3" id="3" accept='image/*' />
                    <FileInput name="4" id="4" accept='image/*' />
                    <FileInput name="5" id="5" accept='image/*' />
                    <div className='col-span-full w-full'></div>
                    <FileInput name="video" id="video" title='*Add Video' accept='video/*' />
                    <FileInput name="floorplan" id="floorplan" title='Add Floorplan' accept='image/*' />
                </div>
                <div className='flex flex-col sm:grid sm:grid-cols-3 mt-20 gap-4'>
                    <label htmlFor="dimensions">
                        <p className='font-semibold'>*Dimensions</p>
                        <Input type="text" id="dimensions" name="dimensions" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="budget">
                        <p className='font-semibold'>*Budget</p>
                        <Input type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="issues">
                        <p className='font-semibold'>*Functional Issues</p>
                        <Input type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="objective">
                        <p className='font-semibold'>*Objective for remodeling</p>
                        <Input type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="style">
                        <p className='font-semibold'>*Preferred style</p>
                        <Input type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="timeline">
                        <p className='font-semibold'>*Timeline</p>
                        <Input type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                    <label htmlFor="request" className='col-span-2'>
                        <p className='font-semibold'>*Special request</p>
                        <Input type="text" id="request" name="request" className='w-full border p-2 rounded-sm mt-1' />
                    </label>
                </div>
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
