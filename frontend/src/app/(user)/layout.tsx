import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <NextTopLoader
                showSpinner={false}
                color='#f9cf2b'
            />
            <main className="flex flex-col max-w-screen-2xl mx-auto">
                <Navbar />
                {children}
                <Footer />
            </main>
        </>
    )
}
