import SectionWrapper from '@/components/custom/SectionWrapper'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function Welcome() {
    return (
        <SectionWrapper>
            <div className='bg-[url("/assets/gallery-1.jpg")] bg-cover bg-center text-center rounded-lg h-[30rem] text-background'>
                <div className='rounded-lg bg-gradient-to-b from-black/60 to-transparent h-full flex flex-col gap-2 items-center justify-center text-3xl'>
                    <p>Indulge In Innovation</p>
                    <p className='text-xl mt-10'>Discover Modern Solutions For Your Bathroom Makeover</p>
                </div>
            </div>
            <div className='flex flex-wrap gap-8 justify-center my-10'>
                <div className='bg-[#00749a] rounded-lg p-10 flex flex-col items-center justify-center gap-4 max-w-[22rem] text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='aspect-square w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center'>
                        <Image src="/assets/Bathlight.png" width={150} height={90} alt="Bathlight" />
                    </div>
                    <div className='font-semibold text-2xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                    <p className='text-sm text-[#d9d9d9]'>
                        Our renovation process begins with understanding your current bathroom, enabling us to tailor solutions that meet your needs, build trust, and deliver a personalized experience from start to finish.
                    </p>
                </div>
                <div className='bg-[#52a1bb] rounded-lg p-10 flex flex-col items-center justify-center gap-4 max-w-[22rem] text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='aspect-square w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center'>
                        <Image src="/assets/Checkall.png" width={90} height={90} alt="Bathlight" />
                    </div>
                    <div className='font-semibold text-2xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                    <p className='text-sm text-[#d9d9d9]'>
                        Explore a curated selection of brands tailored to your preferences. From modern minimalism to timeless elegance, find the perfect match for your unique style and elevate your space effortlessly
                    </p>
                </div>
                <div className='bg-[#00749a] rounded-lg p-10 flex flex-col items-center justify-center gap-4 max-w-[22rem] text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='aspect-square w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center'>
                        <Image src="/assets/Details.png" width={90} height={90} alt="Bathlight" />
                    </div>
                    <div className='font-semibold text-2xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                    <p className='text-sm text-[#d9d9d9]'>
                        Your dream space is just a quote away. Request yours today and let our personalized approach bring your vision to life with brands and products that reflect your unique style.
                    </p>
                </div>
            </div>
            <Button size={'lg'} className={cn('flex mx-auto')}>Get Started</Button>
        </SectionWrapper>
    )
}
