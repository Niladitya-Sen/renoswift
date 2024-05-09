import Navbar from '@/components/custom/Navbar'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

export default function DevLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NextTopLoader
                showSpinner={false}
                color='#f9cf2b'
            />
            <main className="max-w-screen-2xl mx-auto h-screen w-screen relative isolate flex flex-col">
                <Navbar className='max-w-screen-2xl' />
                <section className='py-2 px-4 overflow-y-auto flex flex-col flex-1'>
                    <h1 className='px-4 py-2 bg-primary font-semibold uppercase text-lg text-white mb-4'>Projects</h1>
                    <div className='border-2 rounded-sm pt-4 px-4 flex-1 overflow-y-auto relative'>
                        {children}
                    </div>
                </section>
            </main>
        </>
    )
}