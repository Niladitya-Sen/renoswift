import React, { Suspense } from 'react';

export default function DetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}
