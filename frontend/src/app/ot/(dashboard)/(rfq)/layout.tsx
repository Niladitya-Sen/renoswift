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
                {children}
            </section>
        </div>
    )
}
