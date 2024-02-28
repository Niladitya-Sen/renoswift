"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AdminChangeColorScheme() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes('admin')) {
            document.querySelector('html')?.classList.add('admin');
        } else {
            document.querySelector('html')?.classList.remove('admin');
        }
    }, [pathname]);

    return <></>;
}
