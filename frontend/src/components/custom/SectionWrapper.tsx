import { cn } from '@/lib/utils'
import React from 'react'

export default function SectionWrapper({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <section className={cn('max-w-screen-xl mx-auto px-4 w-full', className)}>
            {children}
        </section>
    )
}
