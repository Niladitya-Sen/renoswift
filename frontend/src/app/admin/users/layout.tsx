"use client";

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function UsersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <div className='space-y-6'>
            <h1 className='heading-1 text-xl underline decoration-4 decoration-primary underline-offset-[5px]'>Manage Users</h1>
            <div className='my-4 grid grid-cols-2 max-w-sm w-full'>
                <Link href={"/admin/users/customers"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                    'border-sky-800 text-sky-800': pathname === '/admin/users/customers'
                })}>Customers</Link>
                <Link href={"/admin/users/ot"} className={cn('border-b-2 pb-1 pl-1 text-gray-500 font-medium', {
                    'border-sky-800 text-sky-800': pathname === '/admin/users/ot'
                })}>Operations Team</Link>
            </div>
            {children}
        </div>
    )
}
