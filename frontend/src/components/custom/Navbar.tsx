"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from '../ui/button';
import SectionWrapper from "./SectionWrapper";
import MobileSidebar from "./MobileSidebar";
import UserDropdown from "./UserDropdown";
import { useCookies } from "@/hooks/useCookies";
import { useEffect, useState } from "react";

export default function Navbar({ className }: Readonly<{ className?: string }>) {
    const pathname = usePathname();
    const cookies = useCookies();
    const [isLoginHidden, setIsLoginHidden] = useState(false);

    useEffect(() => {
        if (cookies?.get('token') || cookies?.get('otToken') || cookies?.get('adminToken')) {
            setIsLoginHidden(true);
        }
    }, [cookies])

    return (
        <nav className={cn('sticky top-0 z-50 bg-background', {
            'hidden': pathname === '/auth/login' || pathname === '/auth/signup'
        })}>
            <SectionWrapper className={cn('py-4 flex max-w-screen-2xl gap-4 items-center px-2 text-foreground', className)}>
                <Link href={"/"} className="w-[40%] sm:w-auto inline-block">
                    <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </Link>
                <div className="flex-grow"></div>
                <div className={cn('hidden', {
                    'flex items-center gap-2': pathname === "/" || pathname === "/about" || pathname === "/services" || pathname === "/packages" || pathname === "/blogs" || pathname === "/testimonials" || pathname === "/presence" || pathname === "/contact"
                })}>
                    <div className='hidden lg:flex items-center gap-2'>
                        <Link href={"/"}>
                            <Button variant={pathname === '/' ? 'default' : 'ghost'} size={'sm'}>Home</Button>
                        </Link>
                        <Link href={"#about"}>
                            <Button variant={'ghost'} size={'sm'}>About Us</Button>
                        </Link>
                        <Link href={"#category"}>
                            <Button variant={'ghost'} size={'sm'}>Categories</Button>
                        </Link>
                        <Link href={"#inspiration"}>
                            <Button variant={'ghost'} size={'sm'}>Inspiration</Button>
                        </Link>
                        <Link href={"#working"}>
                            <Button variant={'ghost'} size={'sm'}>Our Process</Button>
                        </Link>
                        <Link href={"#testimonials"}>
                            <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                        </Link>
                        <Link href={"/contact"}>
                            <Button variant={pathname === '/contact' ? 'default' : 'ghost'} size={'sm'}>Contact</Button>
                        </Link>
                    </div>
                    <Link href={"/auth/login"} className={cn({
                        'hidden': isLoginHidden
                    })}>
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
                                <Link href={"#about"}>
                                    <Button variant={'ghost'} size={'sm'}>About Us</Button>
                                </Link>
                                <Link href={"#category"}>
                                    <Button variant={'ghost'} size={'sm'}>Categories</Button>
                                </Link>
                                <Link href={"#inspiration"}>
                                    <Button variant={'ghost'} size={'sm'}>Inspiration</Button>
                                </Link>
                                <Link href={"#working"}>
                                    <Button variant={'ghost'} size={'sm'}>Our Process</Button>
                                </Link>
                                <Link href={"#testimonials"}>
                                    <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                                </Link>
                                <Link href={"/contact"}>
                                    <Button variant={pathname === '/contact' ? 'default' : 'ghost'} size={'sm'}>Contact</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <UserDropdown />
                {
                    pathname.includes("/ot") && <MobileSidebar role="ot" />
                }
                {
                    pathname.includes("/customer") && <MobileSidebar role="customer" />
                }
            </SectionWrapper>
        </nav>
    )
}

/*
<div className='hidden lg:flex items-center gap-2'>
                        <Link href={"/"}>
                            <Button variant={pathname === '/' ? 'default' : 'ghost'} size={'sm'}>Home</Button>
                        </Link>
                        <Link href={"/about"}>
                            <Button variant={'ghost'} size={'sm'}>About Us</Button>
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

                    <Link href={"/about"}>
                                    <Button variant={'ghost'} size={'sm'}>About Us</Button>
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
*/
