import React from 'react';

export default function RFQLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='space-y-6'>
            <h1 className='heading-1 text-xl underline decoration-4 decoration-primary underline-offset-[5px]'>All RFQs</h1>
            {children}
        </div>
    )
}