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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileSidebar from "./MobileSidebar";

export default function Navbar({ className }: Readonly<{ className?: string }>) {
    const pathname = usePathname();

    return (
        <nav className={cn('sticky top-0 z-50 bg-background', {
            'hidden': pathname === '/auth/login' || pathname === '/auth/signup'
        })}>
            <SectionWrapper className={cn('py-4 flex justify-between items-center px-2 text-foreground', className)}>
                <Link href={"/"} className="w-[40%] sm:w-auto inline-block">
                    <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </Link>
                <div className={cn('hidden', {
                    'flex items-center gap-2': pathname === "/" || pathname === "/about" || pathname === "/services" || pathname === "/packages" || pathname === "/blogs" || pathname === "/testimonials" || pathname === "/presence" || pathname === "/contact"
                })}>
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
                <div className={cn('block', {
                    'hidden': pathname === "/" || pathname === "/about" || pathname === "/services" || pathname === "/packages" || pathname === "/blogs" || pathname === "/testimonials" || pathname === "/presence" || pathname === "/contact"
                })}>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex gap-2 font-semibold items-center justify-center hover:bg-secondary py-2 px-4 rounded-lg">
                                <img src="https://github.com/shadcn.png" alt="profile" className="rounded-full w-10 h-10" />
                                Ram Sharma
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {
                    !pathname.includes('admin') && <MobileSidebar />
                }
            </SectionWrapper>
        </nav>
    )
}
