"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function RFQLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <div className='flex flex-col h-full'>
            <h1 className='px-4 py-2 bg-primary font-semibold uppercase text-lg text-white'>Request For Quotation</h1>
            <section className='border-2 rounded-sm mt-4 pt-4 px-4 flex-1 overflow-y-auto relative'>
                <div className='my-4 grid grid-cols-[0.8fr_1fr_0.8fr] max-w-md w-full'>
                    <Link href={"/ot"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                        'border-primary text-primary': pathname === '/ot' || pathname.includes('/ot/rfq')
                    })}>Raised RFQ</Link>
                    <Link href={"/ot/send-quotation"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                        'border-primary text-primary': pathname.includes('/ot/send-quotation')
                    })}>Send Quotation</Link>
                    <Link href={"/ot/pending"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                        'border-primary text-primary': pathname.includes('/ot/pending')
                    })}>Pending</Link>
                </div>
                {children}
            </section>
        </div>
    )
}
