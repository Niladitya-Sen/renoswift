"use client";

import Link from 'next/link'
import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";
import { TiDocumentText } from "react-icons/ti";
import { BsGiftFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ className }: Readonly<{ className?: string }>) {
    const pathname = usePathname();

    return (
        <nav className={cn('shadow-md bg-white', className)}>
            <ul className='md:w-[17rem] border-2 h-full overflow-hidden'>
                <li>
                    <Link href="/admin" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname === '/admin'
                    })}>
                        <MdOutlineSpaceDashboard className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/users/customers" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/users')
                    })}>
                        <CgProfile className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Manage Users</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/suppliers" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/suppliers')
                    })}>
                        <FiPackage className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Product Suppliers</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/rfqs" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/rfqs')
                    })}>
                        <TiDocumentText className='text-2xl' />
                        <span className='font-medium hidden md:inline'>All RFQs</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/products" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/products')
                    })}>
                        <BsGiftFill className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/orders')
                    })}>
                        <FaRegListAlt className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/payments" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/payments')
                    })}>
                        <MdOutlinePayments className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Payments</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/notifications/all" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200', {
                        'text-primary bg-primary/10 hover:bg-primary/20': pathname.includes('/admin/notifications')
                    })}>
                        <IoMdNotificationsOutline className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Notifications</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className={cn('flex gap-4 px-4 py-3 border-b-2 hover:bg-secondary transition-colors duration-200')}>
                        <FiLogOut className='text-2xl' />
                        <span className='font-medium hidden md:inline'>Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
