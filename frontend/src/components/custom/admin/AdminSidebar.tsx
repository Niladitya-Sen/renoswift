"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import logout from "@/lib/logout";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BsGiftFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FiLogOut, FiPackage } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlinePayments, MdOutlineSpaceDashboard } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";

export default function AdminSidebar({ className }: Readonly<{ className?: string }>) {
    const pathname = usePathname();
    const [clicked, setClicked] = useState(false);
    const [userCollapsibleOpen, setUserCollapsibleOpen] = useState(false);
    const [rfqCollapsibleOpen, setRfqCollapsibleOpen] = useState(false);

    const openNav = () => {
        if (window.innerWidth <= 640) {
            setClicked(true);
        }
    }

    const closeNav = () => {
        setClicked(false);
        setUserCollapsibleOpen(false);
        setRfqCollapsibleOpen(false);
    }

    return (
        <>
            <button
                className={cn({
                    'fixed inset-0 bg-black/50 z-20': clicked,
                    'hidden': !clicked
                })}
                onClick={closeNav}
            ></button>
            <nav className={cn('shadow-md bg-white', className)}>
                <ul className={cn('md:w-[17rem] border-2 h-full overflow-hidden', {
                    "w-[17rem] absolute md:relative z-50 bg-white": clicked,
                })}>
                    <li>
                        <Link href="/admin" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname === '/admin'
                        })}>
                            <MdOutlineSpaceDashboard className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Collapsible
                            open={userCollapsibleOpen}
                            onOpenChange={setUserCollapsibleOpen}
                            className={cn('border-b-2 hover:bg-secondary transition-all duration-300 h-[3rem] overflow-hidden', {
                                'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/users'),
                                'h-[9rem]': userCollapsibleOpen
                            })}
                        >
                            <CollapsibleTrigger
                                className={cn('hover:no-underline px-4 py-3 sm:w-full flex items-center justify-between', {
                                    "w-full": clicked
                                })}
                                onClick={() => {
                                    openNav();
                                    setRfqCollapsibleOpen(false);
                                }}
                            >
                                <div className='flex items-center gap-4'>
                                    <CgProfile className='text-2xl' />
                                    <span className={cn('font-medium hidden md:inline', {
                                        "inline": clicked
                                    })}>Manage Users</span>
                                </div>
                                <FaAngleDown className={cn("transition-transform duration-300", {
                                    "rotate-180": userCollapsibleOpen
                                })} />
                            </CollapsibleTrigger>
                            <CollapsibleContent className={cn('flex flex-col ml-10')}>
                                <Link href={"/admin/users/customers"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200 text-sm', {
                                    'bg-primary text-white hover:bg-primary': pathname === '/admin/users/customers'
                                })}>Customers</Link>
                                <Link href={"/admin/users/operations-team"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200 text-sm mb-4', {
                                    'bg-primary text-white hover:bg-primary': pathname.includes('/admin/users/operations-team')
                                })}>Operations Team</Link>
                            </CollapsibleContent>
                        </Collapsible>
                    </li>
                    <li>
                        <Link href="/admin/suppliers" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/suppliers')
                        })}>
                            <FiPackage className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Product Suppliers</span>
                        </Link>
                    </li>
                    <li>
                        <Collapsible
                            open={rfqCollapsibleOpen}
                            onOpenChange={setRfqCollapsibleOpen}
                            className={cn('border-b-2 hover:bg-secondary transition-all duration-300 h-[3rem] overflow-hidden', {
                                'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/rfqs'),
                                'h-[9rem]': rfqCollapsibleOpen
                            })}
                        >
                            <CollapsibleTrigger
                                onClick={() => {
                                    openNav();
                                    setUserCollapsibleOpen(false);
                                }}
                                className={cn('hover:no-underline px-4 py-3 sm:w-full flex items-center justify-between', {
                                    "w-full": clicked
                                })}
                            >
                                <div className='flex items-center gap-4'>
                                    <TiDocumentText className='text-2xl' />
                                    <span className={cn('font-medium hidden md:inline', {
                                        "inline": clicked
                                    })}>All RFQs</span>
                                </div>
                                <FaAngleDown className={cn("transition-transform duration-300", {
                                    "rotate-180": rfqCollapsibleOpen
                                })} />
                            </CollapsibleTrigger>
                            <CollapsibleContent className={cn('flex flex-col ml-10')}>
                                <Link href={"/admin/rfqs"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200 text-sm', {
                                    'bg-primary text-white hover:bg-primary': pathname.includes('/admin/rfqs') && !pathname.includes('/admin/rfqs/send-quotation')
                                })}>Raised RFQs</Link>
                                <Link href={"/admin/rfqs/send-quotation"} className={cn('font-medium p-3 rounded-l-sm hover:bg-secondary/70 transition-colors duration-200 text-sm mb-2', {
                                    'bg-primary text-white hover:bg-primary': pathname.includes('/admin/rfqs/send-quotation')
                                })}>Send Quotation</Link>
                            </CollapsibleContent>
                        </Collapsible>
                    </li>
                    <li>
                        <Link href="/admin/products" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/products')
                        })}>
                            <BsGiftFill className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/orders" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/orders')
                        })}>
                            <FaRegListAlt className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/payments" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/payments')
                        })}>
                            <MdOutlinePayments className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/notifications/all" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                            'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/notifications')
                        })}>
                            <IoMdNotificationsOutline className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Notifications</span>
                        </Link>
                    </li>
                    <li>
                        <button className={cn('flex w-full gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200')} onClick={logout}>
                            <FiLogOut className='text-2xl' />
                            <span className={cn('font-medium hidden md:inline', {
                                "inline": clicked
                            })}>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
