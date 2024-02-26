import React, { Suspense } from 'react';
import CustomerDetailsForm from '@/components/custom/CustomerDetailsForm';

export default function DetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense>
            <CustomerDetailsForm>
                {children}
            </CustomerDetailsForm>
        </Suspense>
    )
}
