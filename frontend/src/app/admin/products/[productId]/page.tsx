"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import FileInput from '@/components/custom/FileInput';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductDetails({ params: { productId } }: Readonly<{ params: { productId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);

    return (
        <div className='relative'>
            <Link href={`/admin/products`} className={cn('absolute -top-12 right-2 block')}>
                <Button size={'sm'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit')}>Back</Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Product ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Category</TableHead>
                        <TableHead className={cn('text-white')}>Brand</TableHead>
                        <TableHead className={cn('text-white')}>Availability</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{productId}</TableCell>
                        <TableCell>Relaxa Acrylic Bathtub</TableCell>
                        <TableCell>Bathtub</TableCell>
                        <TableCell>Hindware</TableCell>
                        <TableCell>In Stock</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form className='grid grid-cols-2 gap-6 max-w-2xl mt-6'>
                <div className='grid grid-cols-3 sm:grid-cols-4 max-w-2xl col-span-full'>
                    <FileInput readOnly={readOnly} name="1" id="1" accept='image/*' />
                    <FileInput readOnly={readOnly} name="2" id="2" accept='image/*' />
                    <FileInput readOnly={readOnly} name="3" id="3" accept='image/*' />
                    <FileInput readOnly={readOnly} name="4" id="4" accept='image/*' />
                </div>
                <label htmlFor="supplier">
                    <p className='font-medium mb-1'>Supplier</p>
                    <Input readOnly={readOnly} type="text" id="supplier" placeholder="supplier" required />
                </label>
                <label htmlFor="price">
                    <p className='font-medium mb-1'>Price</p>
                    <Input readOnly={readOnly} type="text" id="price" placeholder="Price" required />
                </label>
                <label htmlFor="productDetails" className='col-span-full'>
                    <p className='font-medium mb-1'>Product Details</p>
                    <Textarea readOnly={readOnly} id="productDetails" placeholder="Product Details" required rows={6} />
                </label>
            </form>
            <div className='flex items-center justify-center gap-4 mt-4'>
                <Button type='reset' variant={'destructive'} size={'lg'}>Cancel</Button>
                <Button size={'lg'} onClick={() => { setReadOnly(!readOnly) }}>
                    {readOnly ? 'Edit' : 'Save'}
                </Button>
            </div>
        </div>
    )
}
