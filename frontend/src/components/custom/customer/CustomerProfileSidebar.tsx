"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiSupport } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function CustomerProfileSidebar() {
    return (
        <nav className='self-stretch bg-secondary w-[18rem] hidden sm:flex flex-col gap-2 font-medium'>
            <CustomerProfileSidebarNavLinks />
        </nav>
    )
}

export function CustomerProfileSidebarNavLinks() {
    const pathname = usePathname();
    
    return (
        <>
            <Link href="/customer" className={cn('p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname === ('/customer') || pathname.includes('/customer/profile')
            })}>
                <svg className='w-[20px] md:w-[24px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Profile</p>
            </Link>
            <Accordion type="single" collapsible>
                <AccordionItem value="rfqs" className={cn('hover:bg-black/20 transition-all duration-200', {
                    'bg-primary hover:bg-primary/80': pathname === '/customer/rfqs' || pathname.includes('/customer/rfqs/rrfq') || pathname.includes('/customer/rfqs/received-quotation')
                })}>
                    <AccordionTrigger className={cn('p-4 hover:no-underline')}>
                        <div className='flex items-center gap-8'>
                            <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6069 17.1397H23.3944M14.6069 22.9981H23.3944M14.6069 11.2814H23.3944M8.74854 5.42308C8.74854 5.03465 8.90284 4.66213 9.1775 4.38746C9.45216 4.1128 9.82469 3.9585 10.2131 3.9585H27.7881C28.1766 3.9585 28.5491 4.1128 28.8237 4.38746C29.0984 4.66213 29.2527 5.03465 29.2527 5.42308V33.2502L24.1267 29.5887L19.0006 33.2502L13.8746 29.5887L8.74854 33.2502V5.42308Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className='stroke-black' />
                            </svg>
                            <p>RFQs</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={cn('flex flex-col gap-2 mt-4 ml-10')}>
                        <Link href="/customer/rfqs" className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                            'bg-secondary hover:bg-secondary': pathname === '/customer/rfqs' || pathname.includes('/customer/rfqs/rrfq')
                        })}>
                            Raised RFQ
                        </Link>
                        <Link href="/customer/rfqs/received-quotation" className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                            'bg-secondary hover:bg-secondary': pathname.includes('/customer/rfqs/received-quotation')
                        })}>
                            Received Quotation
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Link href="/customer/order" className={cn('p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/customer/order')
            })}>
                <HiOutlineShoppingCart className='text-xl md:text-2xl' />
                <p>Orders</p>
            </Link>
            <Link href="/customer/payment" className={cn('p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/customer/payment')
            })}>
                <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0833 22.1668V9.50016C30.0833 7.7585 28.6583 6.3335 26.9166 6.3335H4.74992C3.00825 6.3335 1.58325 7.7585 1.58325 9.50016V22.1668C1.58325 23.9085 3.00825 25.3335 4.74992 25.3335H26.9166C28.6583 25.3335 30.0833 23.9085 30.0833 22.1668ZM26.9166 22.1668H4.74992V9.50016H26.9166V22.1668ZM15.8333 11.0835C13.2049 11.0835 11.0833 13.2052 11.0833 15.8335C11.0833 18.4618 13.2049 20.5835 15.8333 20.5835C18.4616 20.5835 20.5833 18.4618 20.5833 15.8335C20.5833 13.2052 18.4616 11.0835 15.8333 11.0835ZM36.4166 11.0835V28.5002C36.4166 30.2418 34.9916 31.6668 33.2499 31.6668H6.33325V28.5002H33.2499V11.0835H36.4166Z" className='fill-black' />
                </svg>
                <p>Payments</p>
            </Link>
            <Link href="/customer/notification/all" className={cn('p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/customer/notification')
            })}>
                <FaRegBell className='text-xl md:text-2xl' />
                <p>Notification</p>
            </Link>
            <Link href="/customer/support" className={cn('p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/customer/support')
            })}>
                <BiSupport className='text-2xl' />
                <p>Support Team</p>
            </Link>
            <Link href="/" className='p-4 flex items-center gap-8 hover:bg-black/20 transition-all duration-200'>
                <FiLogOut className='text-xl md:text-2xl' />
                <p>Logout</p>
            </Link>
        </>
    )
}