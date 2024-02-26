import Navbar from '@/components/custom/Navbar'
import Sidebar from '@/components/custom/Sidebar'
import React from 'react'

export default function OperationsTeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col h-screen max-w-screen-2xl mx-auto">
            <Navbar className='max-w-screen-2xl' />
            <section className='h-full flex'>
                <Sidebar />
                <section className='py-2 px-4 flex-1'>
                    {children}
                </section>
            </section>
        </main>
    )
}
