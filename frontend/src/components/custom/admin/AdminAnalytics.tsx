import Image from 'next/image'
import React from 'react'

export default function AdminAnalytics() {
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-3 gap-8 max-w-[900px]'>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-primary/20 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/rfq.svg'
                        width={36}
                        height={36}
                        alt='RFQs'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>56</p>
                    <p className='font-medium mt-2'>Total RFQ&apos;s</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-orange-100 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/users.svg'
                        width={36}
                        height={36}
                        alt='Users'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>67</p>
                    <p className='font-medium mt-2'>Total Users</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-green-100 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/product.svg'
                        width={36}
                        height={36}
                        alt='Products'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>200</p>
                    <p className='font-medium mt-2'>Total Products</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-violet-100 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/orders.svg'
                        width={36}
                        height={36}
                        alt='Orders'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>54</p>
                    <p className='font-medium mt-2'>Total Orders</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-teal-100 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/brands.svg'
                        width={36}
                        height={36}
                        alt='Brands'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>56</p>
                    <p className='font-medium mt-2'>Total Brands</p>
                </div>
            </div>
            <div className='flex items-center justify-between gap-8 shadow-md p-4 rounded-lg border-2'>
                <div className='bg-indigo-100 rounded-sm p-4'>
                    <Image
                        src='/assets/admin/payments.svg'
                        width={36}
                        height={36}
                        alt='Payments'
                    />
                </div>
                <div className='text-center'>
                    <p className='text-3xl font-semibold'>45</p>
                    <p className='font-medium mt-2'>Total Payments</p>
                </div>
            </div>
        </div>
    )
}
