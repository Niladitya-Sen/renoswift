"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCookies } from "@/hooks/useCookies";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlinePayments, MdOutlineShoppingCart } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

const customerLinks = [
    {
        name: 'Profile',
        url: '/customer',
        icon: <CgProfile className='text-xl' />
    },
    {
        name: 'RFQs',
        url: '/customer/rfqs',
        icon: <TiDocumentText className='text-xl' />
    },
    {
        name: 'Orders',
        url: '/customer/order',
        icon: <MdOutlineShoppingCart className="text-xl" />
    },
    {
        name: 'Payments',
        url: '/customer/payment',
        icon: <MdOutlinePayments className='text-xl' />
    },
    {
        name: 'Notifications',
        url: '/customer/notification/all',
        icon: <IoMdNotificationsOutline className='text-xl' />
    },
    {
        name: 'Support Team',
        url: '/customer/support',
        icon: <BiSupport className='text-xl' />
    },
];

export default function UserDropdown() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name: string, imageURL: string }>();
    const cookies = useCookies();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);

    useEffect(() => {
        if (cookies?.get('token') || cookies?.get('otToken') || cookies?.get('adminToken')) {
            setIsLoggedIn(true);
        }
    }, [cookies]);

    useEffect(() => {
        async function getProfile() {
            let role: "customer" | "ot" | "admin" = "customer";
            let token = cookies?.get('token');

            if (cookies?.get('otToken')) {
                role = "ot";
                token = cookies?.get('otToken');
            } else if (cookies?.get('adminToken')) {
                role = "admin";
                token = cookies?.get('adminToken');
            } else {
                setIsCustomer(true);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${role}/profile`, {
                    headers: {
                        application: 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        }
        if (isLoggedIn) {
            getProfile();
        }
    }, [cookies?.get('token'), isLoggedIn]);

    return (
        <div className={cn('block', {
            'hidden': !isLoggedIn
        })}>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger>
                    {
                        isCustomer ? (
                            <div className="flex gap-4 font-semibold items-center justify-center hover:bg-secondary py-2 px-4 rounded-lg">
                                {
                                    user?.imageURL && <Image width={100} height={100} src={process.env.NEXT_PUBLIC_API_URL as string + user?.imageURL} alt="profile" className="rounded-full w-10 h-10 object-cover object-center" />
                                }
                                <p className="hidden sm:block">{user?.name}</p>
                                <FaAngleDown className={cn("transition-transform duration-150", {
                                    'transform rotate-180': dropdownOpen,
                                })} />
                            </div>
                        ) : (
                            <div className="flex gap-4 font-semibold items-center justify-center hover:bg-secondary py-2 px-4 rounded-lg">
                                <CgProfile className='text-3xl' />
                                <p className="hidden sm:block">{user?.name}</p>
                            </div>
                        )
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn('w-[14rem]', {
                    'hidden': !isCustomer
                })}>
                    {
                        customerLinks.map((link, index) => (
                            <React.Fragment key={index}>
                                <DropdownMenuItem asChild>
                                    <Link href={link.url}>
                                        <div className="w-full flex gap-2 items-center justify-start">
                                            {link.icon}
                                            <p>{link.name}</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </React.Fragment>
                        ))
                    }
                    <DropdownMenuItem>
                        <div className="w-full flex gap-2 items-center justify-start">
                            <FiLogOut className='text-xl' />
                            <p>Log Out</p>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
