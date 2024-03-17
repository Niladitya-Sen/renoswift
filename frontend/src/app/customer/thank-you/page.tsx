import React from 'react'
import { FaCheck } from "react-icons/fa6";

export default function ThankYou({ searchParams: { id } }: { searchParams: { id: string } }) {
    return (
        <section className='flex items-center justify-center h-full'>
            <div className='max-w-lg w-full mx-auto flex flex-col justify-center text-center border-2 py-12 px-4'>
                <div className='bg-green-500 rounded-full aspect-square w-[8rem] flex items-center justify-center self-center'>
                    <FaCheck className='text-8xl text-white' />
                </div>
                <p className='mt-[1em]'>Your RFQ has been successfully sent.</p>
                <p className='mt-[1em] text-blue-500 font-bold'>Reference ID - {id}</p>
                <hr className='h-0.5 mt-1 bg-black' />
                <p className='mt-[1em] uppercase text-[#010847] font-semibold'>Thank you for choosing RENOSWIFT</p>
                <p className='mt-[1em] text-sm font-medium'>You will get notified from the team soon.</p>
            </div>
        </section>
    )
}
