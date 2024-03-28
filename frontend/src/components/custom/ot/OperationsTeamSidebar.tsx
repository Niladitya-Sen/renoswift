"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logout from "@/lib/logout";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown, FaChevronRight } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";


export default function OperationsTeamSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <nav className={cn('self-stretch w-[20rem] hidden sm:flex flex-col gap-2 font-medium overflow-hidden relative z-50 transition-[width] duration-300', {
            'w-[6rem]': !isOpen
        })}>
            <button className={cn("absolute block right-0.5 top-1/2 bg-secondary p-1.5 h-[5rem] rounded-r-sm")} onClick={() => { setIsOpen(!isOpen) }}>
                <FaChevronRight className={cn('text-lg text-black transform transition-transform duration-300', {
                    'rotate-180': isOpen,
                    'rotate-0': !isOpen
                })} />
            </button>
            <OperationsTeamSidebarNavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
    )
}

export function OperationsTeamSidebarNavLinks({ isOpen, setIsOpen }: Readonly<{ isOpen?: boolean, setIsOpen: (isOpen: boolean) => void }>) {
    const pathname = usePathname();
    const [collapsibleOpen, setCollapsibleOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCollapsibleOpen(false);
        }
    }, [isOpen]);

    return (
        <div className={cn("w-[18rem] h-full bg-secondary transition-[width] duration-300 overflow-hidden", {
            'w-[4rem]': !isOpen
        })}>
            <Collapsible
                open={collapsibleOpen}
                onOpenChange={setCollapsibleOpen}
                className={cn('hover:bg-black/20 transition-all h-[4rem] duration-200 overflow-hidden min-w-[15rem]', {
                    'bg-primary hover:bg-primary/80': pathname === '/ot' || pathname.includes('/ot/rfq') || pathname.includes('/ot/send-quotation') || pathname.includes('/ot/pending'),
                    'h-[12rem]': collapsibleOpen
                })}
            >
                <CollapsibleTrigger className={cn('p-5 hover:no-underline w-full')} onClick={() => { setIsOpen(true) }}>
                    <div className='flex items-center gap-8'>
                        <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6069 17.1397H23.3944M14.6069 22.9981H23.3944M14.6069 11.2814H23.3944M8.74854 5.42308C8.74854 5.03465 8.90284 4.66213 9.1775 4.38746C9.45216 4.1128 9.82469 3.9585 10.2131 3.9585H27.7881C28.1766 3.9585 28.5491 4.1128 28.8237 4.38746C29.0984 4.66213 29.2527 5.03465 29.2527 5.42308V33.2502L24.1267 29.5887L19.0006 33.2502L13.8746 29.5887L8.74854 33.2502V5.42308Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className='stroke-black' />
                        </svg>
                        <p className={cn({
                            'hidden': !isOpen
                        })}>RFQs</p>
                        <FaAngleDown className={cn("transition-transform text-xl duration-300 ml-auto", {
                            "rotate-180": collapsibleOpen
                        })} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn('flex flex-col gap-2 ml-10')}>
                    <Link href={"/ot"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                        'bg-secondary hover:bg-secondary': pathname === '/ot' || pathname.includes('/ot/rfq')
                    })}>Raised RFQ</Link>
                    <Link href={"/ot/send-quotation"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                        'bg-secondary hover:bg-secondary': pathname.includes('/ot/send-quotation')
                    })}>Send Quotation</Link>
                    <Link href={"/ot/pending"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                        'bg-secondary hover:bg-secondary': pathname.includes('/ot/pending')
                    })}>Pending</Link>
                </CollapsibleContent>
            </Collapsible>
            <Link href="/ot/orders" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200 min-w-[15rem]', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/orders')
            })}>
                <HiOutlineShoppingCart className='text-xl md:text-2xl' />
                <p className={cn({
                    'hidden': !isOpen
                })}>Orders</p>
            </Link>
            <Link href="/ot/payments" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200 min-w-[15rem]', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/payments')
            })}>
                <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0833 22.1668V9.50016C30.0833 7.7585 28.6583 6.3335 26.9166 6.3335H4.74992C3.00825 6.3335 1.58325 7.7585 1.58325 9.50016V22.1668C1.58325 23.9085 3.00825 25.3335 4.74992 25.3335H26.9166C28.6583 25.3335 30.0833 23.9085 30.0833 22.1668ZM26.9166 22.1668H4.74992V9.50016H26.9166V22.1668ZM15.8333 11.0835C13.2049 11.0835 11.0833 13.2052 11.0833 15.8335C11.0833 18.4618 13.2049 20.5835 15.8333 20.5835C18.4616 20.5835 20.5833 18.4618 20.5833 15.8335C20.5833 13.2052 18.4616 11.0835 15.8333 11.0835ZM36.4166 11.0835V28.5002C36.4166 30.2418 34.9916 31.6668 33.2499 31.6668H6.33325V28.5002H33.2499V11.0835H36.4166Z" className='fill-black' />
                </svg>
                <p className={cn({
                    'hidden': !isOpen
                })}>Payments</p>
            </Link>
            <Link href="/ot/notifications/all" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200 min-w-[15rem]', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/notifications')
            })}>
                <FaRegBell className='text-xl md:text-2xl' />
                <p className={cn({
                    'hidden': !isOpen
                })}>Notifications</p>
            </Link>
            <button className='p-5 w-full flex items-center gap-8 hover:bg-black/20 transition-all duration-200 min-w-[15rem]' onClick={logout}>
                <FiLogOut className='text-xl md:text-2xl' />
                <p className={cn({
                    'hidden': !isOpen
                })}>Logout</p>
            </button>
        </div>
    )
}

export function OperationsTeamMobileSidebarNavLinks() {
    const pathname = usePathname();

    return (
        <>
            <Accordion type="single" collapsible>
                <AccordionItem value="rfqs" className={cn('hover:bg-black/20 transition-all duration-200', {
                    'bg-primary hover:bg-primary/80': pathname === '/ot' || pathname.includes('/ot/rfq') || pathname.includes('/ot/send-quotation') || pathname.includes('/ot/pending')
                })}>
                    <AccordionTrigger className={cn('p-5 hover:no-underline')}>
                        <div className='flex items-center gap-8'>
                            <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6069 17.1397H23.3944M14.6069 22.9981H23.3944M14.6069 11.2814H23.3944M8.74854 5.42308C8.74854 5.03465 8.90284 4.66213 9.1775 4.38746C9.45216 4.1128 9.82469 3.9585 10.2131 3.9585H27.7881C28.1766 3.9585 28.5491 4.1128 28.8237 4.38746C29.0984 4.66213 29.2527 5.03465 29.2527 5.42308V33.2502L24.1267 29.5887L19.0006 33.2502L13.8746 29.5887L8.74854 33.2502V5.42308Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className='stroke-black' />
                            </svg>
                            <p>RFQs</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={cn('flex flex-col gap-2 mt-4 ml-10')}>
                        <Link href={"/ot"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                            'bg-secondary hover:bg-secondary': pathname === '/ot' || pathname.includes('/ot/rfq')
                        })}>Raised RFQ</Link>
                        <Link href={"/ot/send-quotation"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                            'bg-secondary hover:bg-secondary': pathname.includes('/ot/send-quotation')
                        })}>Send Quotation</Link>
                        <Link href={"/ot/pending"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200', {
                            'bg-secondary hover:bg-secondary': pathname.includes('/ot/pending')
                        })}>Pending</Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Link href="/ot/orders" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/orders')
            })}>
                <HiOutlineShoppingCart className='text-xl md:text-2xl' />
                <p>Orders</p>
            </Link>
            <Link href="/ot/payments" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/payments')
            })}>
                <svg className='w-[20px] md:w-[24px]' viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0833 22.1668V9.50016C30.0833 7.7585 28.6583 6.3335 26.9166 6.3335H4.74992C3.00825 6.3335 1.58325 7.7585 1.58325 9.50016V22.1668C1.58325 23.9085 3.00825 25.3335 4.74992 25.3335H26.9166C28.6583 25.3335 30.0833 23.9085 30.0833 22.1668ZM26.9166 22.1668H4.74992V9.50016H26.9166V22.1668ZM15.8333 11.0835C13.2049 11.0835 11.0833 13.2052 11.0833 15.8335C11.0833 18.4618 13.2049 20.5835 15.8333 20.5835C18.4616 20.5835 20.5833 18.4618 20.5833 15.8335C20.5833 13.2052 18.4616 11.0835 15.8333 11.0835ZM36.4166 11.0835V28.5002C36.4166 30.2418 34.9916 31.6668 33.2499 31.6668H6.33325V28.5002H33.2499V11.0835H36.4166Z" className='fill-black' />
                </svg>
                <p>Payments</p>
            </Link>
            <Link href="/ot/notifications/all" className={cn('p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200', {
                'bg-primary hover:bg-primary/80': pathname.includes('/ot/notifications')
            })}>
                <FaRegBell className='text-xl md:text-2xl' />
                <p>Notifications</p>
            </Link>
            <button className='p-5 flex items-center gap-8 hover:bg-black/20 transition-all duration-200' onClick={logout}>
                <FiLogOut className='text-xl md:text-2xl' />
                <p>Logout</p>
            </button>
        </>
    )
}