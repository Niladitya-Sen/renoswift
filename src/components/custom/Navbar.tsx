"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsMoonStarsFill } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdSunny } from "react-icons/md";
import { Button } from '../ui/button';


export default function Navbar() {
    const [theme, setTheme] = React.useState<'light' | 'dark' | null>(null);

    useEffect(() => {
        const theme_local = localStorage.getItem('theme') as 'light' | 'dark';
        if (theme_local) {
            setTheme(theme_local);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        if (localStorage.getItem('theme') !== theme && theme !== null) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <nav className='sticky top-0 z-50 bg-background'>
            <section className='py-4 flex justify-between items-center px-2 text-foreground'>
                <Link href={"/"}>
                    <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </Link>
                <div className='flex items-center gap-2'>
                    <div className='hidden lg:flex items-center gap-2'>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Home</Button>
                        </Link>
                        <Link href={"/about"}>
                            <Button variant={'ghost'} size={'sm'}>About Us</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Services</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Packages</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Blogs</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                        </Link>
                        <Link href={"/"}>
                            <Button variant={'ghost'} size={'sm'}>Our Presence</Button>
                        </Link>
                        <Link href={"/contact"}>
                            <Button variant={'ghost'} size={'sm'}>Contact</Button>
                        </Link>
                    </div>
                    <Button className={cn('hidden')} variant={'ghost'} size={'icon'} onClick={() => {
                        if (theme === 'dark') {
                            setTheme('light');
                        } else {
                            setTheme('dark');
                        }
                    }}>
                        {
                            theme === 'dark' ? (
                                <MdSunny className='text-xl text-primary' onClick={() => setTheme('dark')} />
                            ) : (
                                <BsMoonStarsFill className='text-xl' onClick={() => setTheme('light')} />
                            )
                        }
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'ghost'} size={'icon'} className={cn('block lg:hidden')}>
                                <HiMenuAlt3 className='text-xl' />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className='flex flex-col items-start'>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Home</Button>
                                </Link>
                                <Link href={"/about"}>
                                    <Button variant={'ghost'} size={'sm'}>About Us</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Services</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Packages</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Blogs</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={'ghost'} size={'sm'}>Our Presence</Button>
                                </Link>
                                <Link href={"/contact"}>
                                    <Button variant={'ghost'} size={'sm'}>Contact</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </section>
        </nav>
    )
}
