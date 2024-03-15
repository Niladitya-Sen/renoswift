"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SupplierDetails({ params: { supplierId } }: Readonly<{ params: { supplierId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);

    return (
        <div className='relative space-y-6'>
            <Link href={`/admin/suppliers`} className={cn('absolute -top-16 right-2 block')}>
                <Button size={'sm'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit')}>Back</Button>
            </Link>

            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Customer ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>date</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{supplierId}</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8'>
                <label htmlFor="spoc">
                    <p className='font-medium mb-1'>SPOC</p>
                    <Input readOnly={readOnly} type="text" id="spoc" placeholder="SPOC" required />
                </label>
                <label htmlFor="date">
                    <p className='font-medium mb-1'>Date Joined</p>
                    <Input readOnly={readOnly} type="date" id="date" placeholder="date" required />
                </label>
                <label htmlFor="yearOperation">
                    <p className='font-medium mb-1'>Years in Operation</p>
                    <Input readOnly={readOnly} type="text" id="yearOperation" placeholder="Years in Operation" required />
                </label>
                <label htmlFor="brandDealings" className='col-span-2'>
                    <p className='font-medium mb-1'>Brand Dealings</p>
                    <Input readOnly={readOnly} type="text" id="yearOperatiobrandDealings" placeholder="Brand Dealings" required />
                </label>
                <label htmlFor="address" className='col-span-full'>
                    <p className='font-medium mb-1'>Address</p>
                    <Textarea readOnly={readOnly} id="address" placeholder="Address" required rows={5} />
                </label>
            </form>

            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Product ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Category</TableHead>
                        <TableHead className={cn('text-white')}>Brand</TableHead>
                        <TableHead className={cn('text-white')}>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">RS012588</TableCell>
                        <TableCell>Relaxa Acrylic Bathtub</TableCell>
                        <TableCell>Bathtub</TableCell>
                        <TableCell>Hindware</TableCell>
                        <TableCell>
                            {(18999).toLocaleString('en-IN', {
                                currency: 'INR',
                                style: 'currency',
                            })}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className='flex w-full gap-4 items-center justify-center'>
                <Button size={'lg'} variant={'destructive'}>Delete Account</Button>
                <Button size={'lg'} onClick={() => {
                    setReadOnly(!readOnly);
                }}>
                    {
                        readOnly ? 'Edit' : 'Save'
                    }
                </Button>
            </div>
        </div>
    )
}
