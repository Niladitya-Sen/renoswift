"use client";

import Link from 'next/link';
import React from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className='sticky self-stretch top-0 bg-secondary w-[18rem] flex flex-col gap-4 font-medium font-lg'>
            <Link href="/ot" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname === '/ot' || pathname.includes('/ot/rfq') || pathname.includes('/ot/send-quotation') || pathname.includes('/ot/pending')
            })}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6069 17.1397H23.3944M14.6069 22.9981H23.3944M14.6069 11.2814H23.3944M8.74854 5.42308C8.74854 5.03465 8.90284 4.66213 9.1775 4.38746C9.45216 4.1128 9.82469 3.9585 10.2131 3.9585H27.7881C28.1766 3.9585 28.5491 4.1128 28.8237 4.38746C29.0984 4.66213 29.2527 5.03465 29.2527 5.42308V33.2502L24.1267 29.5887L19.0006 33.2502L13.8746 29.5887L8.74854 33.2502V5.42308Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className='stroke-black' />
                </svg>
                RFQs
            </Link>
            <Link href="/ot/orders" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/orders')
            })}>
                <HiOutlineShoppingCart size={38} />
                Orders
            </Link>
            <Link href="/ot/payments" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/payments')
            })}>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0833 22.1668V9.50016C30.0833 7.7585 28.6583 6.3335 26.9166 6.3335H4.74992C3.00825 6.3335 1.58325 7.7585 1.58325 9.50016V22.1668C1.58325 23.9085 3.00825 25.3335 4.74992 25.3335H26.9166C28.6583 25.3335 30.0833 23.9085 30.0833 22.1668ZM26.9166 22.1668H4.74992V9.50016H26.9166V22.1668ZM15.8333 11.0835C13.2049 11.0835 11.0833 13.2052 11.0833 15.8335C11.0833 18.4618 13.2049 20.5835 15.8333 20.5835C18.4616 20.5835 20.5833 18.4618 20.5833 15.8335C20.5833 13.2052 18.4616 11.0835 15.8333 11.0835ZM36.4166 11.0835V28.5002C36.4166 30.2418 34.9916 31.6668 33.2499 31.6668H6.33325V28.5002H33.2499V11.0835H36.4166Z" className='fill-black' />
                </svg>
                Payments
            </Link>
            <Link href="/ot/notifications/all" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/notifications')
            })}>
                <FaRegBell size={38} />
                Notifications
            </Link>
            <Link href="/" className='p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200'>
                <FiLogOut size={38} />
                Logout
            </Link>
        </nav>
    )
}