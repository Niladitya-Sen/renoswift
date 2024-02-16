"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from '../ui/button';
import { usePathname } from "next/navigation";
import SectionWrapper from "./SectionWrapper";


export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={cn('sticky top-0 z-50 bg-background', {
            'hidden': pathname === '/auth/login' || pathname === '/auth/signup'
        })}>
            <SectionWrapper className='py-4 flex justify-between items-center px-2 text-foreground'>
                <Link href={"/"}>
                    <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </Link>
                <div className='flex items-center gap-2'>
                    <div className='hidden lg:flex items-center gap-2'>
                        <Link href={"/"}>
                            <Button variant={pathname === '/' ? 'default' : 'ghost'} size={'sm'}>Home</Button>
                        </Link>
                        <Link href={"/about"}>
                            <Button variant={pathname === '/about' ? 'default' : 'ghost'} size={'sm'}>About Us</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={pathname === '/services' ? 'default' : 'ghost'} size={'sm'}>Services</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={pathname === '/packages' ? 'default' : 'ghost'} size={'sm'}>Packages</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={pathname === '/blogs' ? 'default' : 'ghost'} size={'sm'}>Blogs</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={pathname === '/testimonials' ? 'default' : 'ghost'} size={'sm'}>Testimonials</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={pathname === '/presence' ? 'default' : 'ghost'} size={'sm'}>Our Presence</Button>
                        </Link>
                        <Link href={"/contact"}>
                            <Button variant={pathname === '/contact' ? 'default' : 'ghost'} size={'sm'}>Contact</Button>
                        </Link>
                    </div>
                    <Link href={"/auth/login"}>
                        <Button variant={'outline'} className={cn('border-primary border-[3px]')} size={'sm'}>Login</Button>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'ghost'} size={'icon'} className={cn('inline-flex lg:hidden')}>
                                <HiMenuAlt3 className='text-xl' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className='flex flex-col items-start'>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/' ? 'default' : 'ghost'} size={'sm'}>Home</Button>
                                </Link>
                                <Link href={"/about"}>
                                    <Button variant={pathname === '/about' ? 'default' : 'ghost'} size={'sm'}>About Us</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/services' ? 'default' : 'ghost'} size={'sm'}>Services</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/packages' ? 'default' : 'ghost'} size={'sm'}>Packages</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/blogs' ? 'default' : 'ghost'} size={'sm'}>Blogs</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/testimonials' ? 'default' : 'ghost'} size={'sm'}>Testimonials</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={pathname === '/presence' ? 'default' : 'ghost'} size={'sm'}>Our Presence</Button>
                                </Link>
                                <Link href={"/contact"}>
                                    <Button variant={pathname === '/contact' ? 'default' : 'ghost'} size={'sm'}>Contact</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </SectionWrapper>
        </nav>
    )
}
