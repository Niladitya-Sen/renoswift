import Navbar from '@/components/custom/Navbar'
import CustomerProfileSidebar from '@/components/custom/customer/CustomerProfileSidebar'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'


export default function CustomerProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NextTopLoader
                showSpinner={false}
                color='#f9cf2b'
            />
            <main className="max-w-screen-2xl mx-auto grid sm:grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen w-screen relative isolate">
                <header className='col-span-full'>
                    <Navbar className='max-w-screen-2xl' />
                </header>
                <CustomerProfileSidebar />
                <section className='py-2 px-4 overflow-y-auto flex-1'>
                    {children}
                </section>
            </main>
        </>
    )
}
