"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function RFQLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <div className='space-y-6'>
            <h1 className='heading-1 text-xl underline decoration-4 decoration-primary underline-offset-[5px]'>All RFQs</h1>
            <div className='my-4 grid grid-cols-[1fr_1fr] max-w-xs w-full'>
                <Link href={"/admin/rfqs"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                    'border-primary text-primary': pathname.includes('/admin/rfqs') && !pathname.includes('/admin/rfqs/send-quotation')
                })}>Raised RFQ</Link>
                <Link href={"/admin/rfqs/send-quotation"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                    'border-primary text-primary': pathname.includes('/admin/rfqs/send-quotation')
                })}>Send Quotation</Link>
            </div>
            {children}
        </div>
    )
}
