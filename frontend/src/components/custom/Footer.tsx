"use client";

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosCall } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SectionWrapper from './SectionWrapper';
import facebookSvg from '../../../public/assets/logos_facebook - Copy.svg'
import linkedinSvg from "../../../public/assets/devicon_linkedin.svg"
import instagramSVG from "../../../public/assets/skill-icons_instagram.svg"
import { useToast } from '../ui/use-toast';
export default function Footer() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const {toast} = useToast();
    const pathname = usePathname();

    const handleSubscribe = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/subscriptionemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            if (response.ok) {
                toast({
                    title: result.message,
                });
               
            } else if (response.status === 400) {
                toast({
                    title: result.message,
                });
            }
           
            else {
                toast({
                    title: "Something Goes Wrong, Try again Please",
                });
            }
        } catch (error) {
            toast({
                title: "something goes wrong",
            });
        }
    };
    return (
        <SectionWrapper className={cn('w-full mt-10')}>
            <footer className={cn('bg-primary/20 dark:bg-primary/50 mb-10 rounded-lg py-12 px-10 sm:px-20 w-full', {
                'hidden': pathname === '/auth/login' || pathname === '/auth/signup'
            })}>
                {/* <div className='flex items-center justify-center w-full mb-4'>
                    <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </div> */}
                <hr />
                <section className='flex flex-wrap gap-4 items-start justify-center md:justify-between mt-5'>
                    <div className='flex flex-col sm:flex-row gap-12 justify-center text-center sm:text-start sm:justify-between w-full sm:w-auto'>
                        {/* <div>
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
                        </div> */}
                         <div className='flex flex-col items-center justify-center w-full mb-4 '>
                    <Image src='/assets/logo.jpg' alt='logo' width={300} height={100} />
                    <div className="sm:max-w-xs text-center sm:text-start">

                    <p className='italic text-sm mt-1 text-foreground/80 flex flex-col gap-2 mt-6 '>Embark on a journey with us to turn your vision into reality.
</p>
                    </div>

                    <div className='flex items-center justify-start gap-8 mt-6 sm:max-w-xs text-center sm:text-start'>
                    <Link href="https://www.linkedin.com/company/78811632/admin/notifications/all/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src={linkedinSvg} alt="LinkedIn Logo" className="h-8 w-8 transition-transform duration-300 hover:translate-x-2" />
        </a>
      </Link>
      <Link href="https://www.instagram.com/renoswift/" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src={instagramSVG} alt="Instagram Logo" className="h-8 w-8 transition-transform duration-300 hover:translate-x-2" />
        </a>
      </Link>
      <Link href="https://www.facebook.com/ChooseRenoswift" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <Image src={facebookSvg} alt="Facebook Logo" className="h-8 w-8 transition-transform duration-300 hover:translate-x-2" />
        </a>
      </Link>
    </div>
                   
                </div>
                        <div>
                            <h5 className='mb-2 font-semibold lg:w-36'>Quick links</h5>
                            <ul className='text-foreground/80 flex flex-col gap-2'>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="/contact">Contact</Link>
                                </li>
                               

                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="/cookiespolicy">Cookies Policy</Link>
                                </li>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="/privacypolicy">Privacy Policy</Link>
                                </li>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="/termandconditions">Term & Conditions</Link>
                                </li>

                                {/* <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="#">Afterpay</Link>
                                </li>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="#">Shop</Link>
                                </li>
                                <li className="transition-transform duration-300 hover:translate-x-4">
                                    <Link href="#">FAQ</Link>
                                </li> */}
                            </ul>
                        </div>
                        {/* <div>
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
                        </div> */}
                        <div >
                            <h5 className='mb-2 font-semibold'>Contact Us</h5>
                            <ul className='text-foreground/80 flex flex-col gap-2 '>
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
                                
                            </ul>

                            <div
                             className=" flex items-center justify-center  transition-transform duration-300 hover:translate-x-4 mt-2">
                                <MdMail className='inline-block mr-2 text-lg' />
                                    <Link href="mailto:info@renoswift.com">
        
                                        info@renoswift.com
                                    </Link>
                                
                            </div>
                        </div>
                    </div>
                    <div className="sm:max-w-xs text-center sm:text-start">
                        <h5 className='font-semibold mb-2'>Sign up for our newsletter</h5>
                        <p className='italic text-sm mt-1 text-foreground/80 flex flex-col gap-2'>Add your email address to sign up for our monthly emails and to receive promotional offers.</p>
                        <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full mt-2">
                        <Input
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button onClick={handleSubscribe}>Subscribe</Button>
                        </div>
                         {message && <p className="mt-2 text-sm text-foreground/80">{message}</p>}
                    </div>
                </section>
            </footer>
        </SectionWrapper>
    )
}
