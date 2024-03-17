'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex items-center h-screen justify-around flex-wrap'>
            <Image src="/assets/error/500.svg" alt="500" width={500} height={500} />
            <div className='max-w-lg'>
                <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-foreground">500 Internal Server Error</h1>
                <p className='leading-relaxed mt-[1em] font-xl'>Oops! Something went wrong on our end.</p>
                <p className='leading-relaxed mt-[1em]'>We apologize for the inconvenience. Our team has been notified of the issue and will work to fix it as soon as possible.</p>
                <p className='leading-relaxed mt-[1em]'>In the meantime, you can try the following:</p>
                <ul className='list-disc list-inside'>
                    <li className='mt-[0.5em]'>Refresh the page and try again.</li>
                    <li className='mt-[0.5em]'>If the problem persists, please come back later.</li>
                </ul>
                <p className='leading-relaxed mt-[1em]'>Thank you for your patience.</p>
                <div className="flex gap-4 mt-4">
                    <Link href='/customer'>
                        <Button>Home</Button>
                    </Link>
                    <Button
                        variant={"secondary"}
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}