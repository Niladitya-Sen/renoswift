"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useCookies } from '@/hooks/useCookies';
import AdminBrandSelect from '@/components/custom/admin/AdminBrandSelect';

type SupplierType = {
    supplierId: string,
    name: string,
    email: string,
    phoneNumber: string,
    isActive: boolean,
    spoc: string,
    createdDate: string,
    yearsInOperation: string,
    brands: { brandId: number }[],
    address: string
};

export default function SupplierDetails({ params: { supplierId } }: Readonly<{ params: { supplierId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);
    const [supplier, setSupplier] = useState<SupplierType>();
    const cookies = useCookies();

    useEffect(() => {
        async function getSupplier() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/suppliers/${supplierId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`
                }
            });
            const data = await response.json();
            setSupplier(data);
        }
        getSupplier();
    }, [supplierId]);

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
                        <TableCell className="font-medium">{supplier?.supplierId}</TableCell>
                        <TableCell>{supplier?.name}</TableCell>
                        <TableCell>{supplier?.email}</TableCell>
                        <TableCell>{supplier?.phoneNumber}</TableCell>
                        <TableCell>{supplier?.isActive ? "Active" : "Inactive"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8'>
                <label htmlFor="spoc">
                    <p className='font-medium mb-1'>SPOC</p>
                    <Input readOnly={readOnly} value={supplier?.spoc} type="text" id="spoc" placeholder="SPOC" required />
                </label>
                <label htmlFor="date">
                    <p className='font-medium mb-1'>Date Joined</p>
                    <Input readOnly={readOnly} value={dayjs(supplier?.createdDate).format("YYYY-MM-DD")} type="date" id="date" placeholder="date" required />
                </label>
                <label htmlFor="yearOperation">
                    <p className='font-medium mb-1'>Years in Operation</p>
                    <Input readOnly={readOnly} defaultValue={supplier?.yearsInOperation} type="text" id="yearOperation" placeholder="Years in Operation" required />
                </label>
                <label htmlFor="brandDealings" className='col-span-2'>
                    <p className='font-medium mb-1'>Brand Dealings</p>
                    <AdminBrandSelect defaultValue={supplier?.brands.map(e => e.brandId)} readOnly={readOnly} />
                </label>
                <label htmlFor="address" className='col-span-full'>
                    <p className='font-medium mb-1'>Address</p>
                    <Textarea readOnly={readOnly} defaultValue={supplier?.address} id="address" placeholder="Address" required rows={5} />
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
