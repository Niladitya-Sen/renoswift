import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function Newsletter() {
    return (
        <section className='my-20 bg-[url("/assets/gallery-1.jpg")] bg-cover bg-center h-[30rem] rounded-lg p-8 flex items-center justify-center md:justify-stretch'>
            <div className='max-w-xl w-full md:ml-16'>
                <h2 className='heading-1 text-2xl text-white'>Stay in touch!</h2>
                <p className='mt-2 text-white'>Be first to know about all new interior features!</p>
                <div className='flex flex-wrap sm:flex-nowrap gap-4 mt-8'>
                    <Input placeholder='Enter your email address' />
                    <Button>Subscribe Now</Button>
                </div>
            </div>
        </section>
    )
}
