import CustomerReviewDialog from '@/components/custom/customer/CustomerReviewDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

type DataType = {
    id: number;
    url: string;
    type: string;
}

type VRType = {
    before: DataType;
    during: DataType;
    after: DataType;
}

async function getVR(orderId: string): Promise<VRType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/vr/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('token')?.value}`
        },
        cache: 'no-store'
    });
    const data = await response.json();
    return data;
}

export default async function VRDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const vr = await getVR(orderId);

    return (
        <>
            <Link href="/customer/vr" className='block ml-auto w-fit text-primary mr-8 py-4'>
                back
            </Link>
            <section className='flex flex-col h-[85%]'>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-4 gap-y-8 items-center justify-between'>
                    <VRCard {...vr.before} type='Before' />
                    <VRCard {...vr.during} type='During' />
                    <VRCard {...vr.after} type='After' />
                </div>
                <div className='flex-1'></div>
                <CustomerReviewDialog />
            </section>
        </>
    )
}

function VRCard(props: Readonly<DataType>) {
    return (
        <div className='relative flex flex-col items-center'>
            {
                props.url ? (
                    <iframe title={props.type} src={props.url} className='h-[300px] w-full sm:w-[300px] rounded-lg' />
                ) : (
                    <div className='h-[300px] w-full sm:w-[300px] bg-zinc-500/40 rounded-lg flex items-center justify-center text-xl text-zinc-500 font-semibold'>
                        Not Yet Uploaded
                    </div>
                )
            }
            <Button size={"lg"} className={cn("absolute -bottom-4")}>{props.type}</Button>
        </div>
    )
}
