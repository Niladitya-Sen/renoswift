import React from 'react';
import CustomerDetailsForm from '@/components/custom/CustomerDetailsForm';

export default function DetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <CustomerDetailsForm>
            {children}
        </CustomerDetailsForm>
    )
}
