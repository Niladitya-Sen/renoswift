import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
    return (
        <div>
            <Skeleton className='w-[200px] h-[200px] rounded-lg' />
            <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 my-10 gap-4'>
                <Skeleton className='w-full h-10 rounded-sm' />
                <Skeleton className='w-full h-10 rounded-sm' />
                <Skeleton className='w-full h-10 rounded-sm' />
                <Skeleton className='w-full h-24 rounded-sm' />
            </div>
            <div className='flex gap-4 items-center justify-center w-full col-span-full mt-4'>
                <Skeleton className='w-[200px] h-12 rounded-sm' />
                <Skeleton className='w-[100px] h-12 rounded-sm' />
            </div>
        </div>
    )
}
