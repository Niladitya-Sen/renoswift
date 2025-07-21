import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section className='bg-[url("/renovate-pro/assets/auth/authBg.webp")] bg-cover bg-center bg-no-repeat h-screen px-2 flex items-center'>
            <Link href='/'>
                <Image
                    src={'/assets/logo.jpg'}
                    alt='logo'
                    width={200}
                    height={100}
                    className='absolute top-2 right-2'
                />
            </Link>
            {children}
        </section>
    )
}
