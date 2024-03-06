import SectionWrapper from '@/components/custom/SectionWrapper'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Welcome() {
    return (
        <SectionWrapper className='mb-10'>
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
                    <div className='font-semibold text-xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                </div>
                <div className='bg-[#52a1bb] rounded-lg p-10 flex flex-col items-center justify-center gap-4 max-w-[22rem] text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='aspect-square w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center'>
                        <Image src="/assets/Checkall.png" width={90} height={90} alt="Bathlight" />
                    </div>
                    <div className='font-semibold text-xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                </div>
                <div className='bg-[#00749a] rounded-lg p-10 flex flex-col items-center justify-center gap-4 max-w-[22rem] text-center text-white transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                    <div className='aspect-square w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center'>
                        <Image src="/assets/Details.png" width={90} height={90} alt="Bathlight" />
                    </div>
                    <div className='font-semibold text-xl'>
                        <p>Share your Space</p>
                        <p>Shape your Dream</p>
                    </div>
                </div>
            </div>
            <Link href="/customer/details" className={cn('block w-fit mx-auto')}>
                <Button size={'lg'}>Get Started</Button>
            </Link>
        </SectionWrapper>
    )
}
