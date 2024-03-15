import React from 'react'

export default function PaymentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className='flex flex-col h-full'>
            <h1 className='px-4 py-2 bg-primary font-semibold uppercase text-lg text-white mb-4'>Payments</h1>
            <div className='border-2 rounded-sm pt-4 px-4 flex-1 overflow-y-auto relative'>
                {children}
            </div>
        </section>
    )
}
