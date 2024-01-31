import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosCall } from "react-icons/io";
import { MdMail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className='bg-primary/20 dark:bg-primary/50 mt-20 mb-10 rounded-lg py-12 px-10 sm:px-20'>
            <div className='flex items-center justify-center w-full mb-4'>
                <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
            </div>
            <hr />
            <section className='flex flex-wrap gap-8 items-start justify-center md:justify-between mt-5'>
                <div className='flex flex-col sm:flex-row gap-8 justify-center text-center sm:text-start sm:justify-between w-full sm:w-auto'>
                    <div>
                        <h5 className='mb-2 font-semibold'>Browse by</h5>
                        <ul className='text-foreground/80 flex flex-col gap-2'>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Brand</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Product</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Category</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Projects</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Sales</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='mb-2 font-semibold'>Quick links</h5>
                        <ul className='text-foreground/80 flex flex-col gap-2'>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">In-Store Pickup</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Gift Cards</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Afterpay</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Shop</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='mb-2 font-semibold'>Order info</h5>
                        <ul className='text-foreground/80 flex flex-col gap-2'>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Order Status </Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Payments</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Shipping</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Returns</Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">Order history</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='mb-2 font-semibold'>Contact Us</h5>
                        <ul className='text-foreground/80 flex flex-col gap-2'>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">
                                    <IoIosCall className='inline-block mr-2 text-lg' />
                                    +911204902825
                                </Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">
                                    <IoIosCall className='inline-block mr-2 text-lg' />
                                    +919818204406
                                </Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="#">
                                    <IoIosCall className='inline-block mr-2 text-lg' />
                                    +919205022725
                                </Link>
                            </li>
                            <li className="transition-transform duration-300 hover:translate-x-4">
                                <Link href="mailto:info@renoswift.com">
                                    <MdMail className='inline-block mr-2 text-lg' />
                                    info@renoswift.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sm:max-w-xs text-center sm:text-start">
                    <h5 className='font-semibold mb-2'>Sign up for our newsletter</h5>
                    <p className='italic text-sm mt-1 text-foreground/80 flex flex-col gap-2'>Add your email address to sign up for our monthly emails and to receive promotional offers.</p>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-2">
                        <Input placeholder="Email address" />
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </section>
        </footer>
    )
}
