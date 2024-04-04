import Image from 'next/image'
import React from 'react'
import { FaStar } from "react-icons/fa6"

export default function ClientReview() {
    return (
        <section id="testimonials" className='flex flex-wrap gap-8 items-center justify-between my-20'>
            <div className='sm:max-w-[25rem] w-full'>
                <h1 className='heading-1'>What <span className='text-primary'>Our Clients</span> Say About Us</h1>
                <p className='text-lg font-semibold mt-[1em]'>These are some reviews of our services from previous clients.</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
                <Image
                    src='/assets/client.png'
                    alt='client'
                    width={132}
                    height={132}
                    className='rounded-full object-cover object-center w-[132px] border-[5px] border-primary'
                />
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-start justify-start'>
                        <p className='heading-1'>Shivani Sharma</p>
                        <div className='flex gap-2 p-2 bg-primary rounded-sm'>
                            {
                                Array(5).fill(0).map((_, index) => (
                                    <FaStar key={index} className='text-white' />
                                ))
                            }
                        </div>
                    </div>
                    <div className='p-4 text-sm shadow-lg bg-primary rounded-sm text-white max-w-lg'>
                        Renoswift truly exceeded my expectations! Their team transformed my outdated bathroom completely. From start to finish, they were professional, efficient, and attentive to every detail. I&apos;m thrilled with the results and highly recommend them for anyone looking to upgrade their bathroom space.
                    </div>
                </div>
            </div>
        </section>
    )
}
