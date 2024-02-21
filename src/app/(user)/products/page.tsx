import SectionWrapper from '@/components/custom/SectionWrapper'
import { cn } from '@/lib/utils';
import React from 'react'
import { IoSearch } from "react-icons/io5";

export default function Products() {
    return (
        <SectionWrapper>
            <div className='bg-[url("/assets/gallery-1.jpg")] bg-cover bg-center rounded-lg h-[20rem]'>
                <div className='rounded-lg bg-gradient-to-b from-black/60 to-transparent h-full relative flex flex-col p-12'>
                    <search className='self-end bg-background rounded-lg max-w-sm w-full flex items-center justify-center px-4 py-3'>
                        <input type="text" placeholder='Search product by name or category' className={cn('border-none outline-none w-full')} />
                        <IoSearch className='text-xl text-black' />
                    </search>
                    <div className='flex-1'></div>
                    <p className='text-3xl max-w-md self-start text-background'>Transform Your Space and Discover Bathroom Bliss</p>
                </div>
            </div>
            <section className='my-10'>
                <p className='font-semibold text-xl'>Categories</p>
            </section>
        </SectionWrapper>
    )
}
