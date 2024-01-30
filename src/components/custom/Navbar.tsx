"use client";

import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import { HiMenuAlt3 } from "react-icons/hi";
import { cn } from '@/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


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
                        <Button variant={'ghost'} size={'sm'}>Home</Button>
                        <Button variant={'ghost'} size={'sm'}>About Us</Button>
                        <Button variant={'ghost'} size={'sm'}>Services</Button>
                        <Button variant={'ghost'} size={'sm'}>Packages</Button>
                        <Button variant={'ghost'} size={'sm'}>Blogs</Button>
                        <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                        <Button variant={'ghost'} size={'sm'}>Our Presence</Button>
                        <Button variant={'ghost'} size={'sm'}>Contact</Button>
                    </div>
                    <Button variant={'ghost'} size={'icon'} onClick={() => {
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
                                <Button variant={'ghost'} size={'sm'}>Home</Button>
                                <Button variant={'ghost'} size={'sm'}>About Us</Button>
                                <Button variant={'ghost'} size={'sm'}>Services</Button>
                                <Button variant={'ghost'} size={'sm'}>Packages</Button>
                                <Button variant={'ghost'} size={'sm'}>Blogs</Button>
                                <Button variant={'ghost'} size={'sm'}>Testimonials</Button>
                                <Button variant={'ghost'} size={'sm'}>Our Presence</Button>
                                <Button variant={'ghost'} size={'sm'}>Contact</Button>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </section>
        </nav>
    )
}
