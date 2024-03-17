import React, { Suspense } from 'react'

export default function PayLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}
