"use client";

import AdminConnectWithTeam from '@/components/custom/admin/AdminConnectWithTeam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

export default function UserDetails({ params: { type, userId } }: Readonly<{ params: { type: string, userId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);

    if (type === 'customers') {
        notFound();
    }

    return (
        <div className='relative'>
            <Link href={`/admin/users/${type}`} className={cn('absolute -top-16 right-2 block')}>
                <Button size={'sm'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit')}>Back</Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Customer ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Email</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{userId}</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form className='grid grid-cols-2 gap-4 max-w-screen-md mt-8'>
                <label htmlFor="email">
                    <p className='font-medium mb-1'>Email</p>
                    <Input readOnly={readOnly} type="email" id="email" placeholder="Email" inputMode='email' required />
                </label>
                <label htmlFor="contactNumber">
                    <p className='font-medium mb-1'>Contact Number</p>
                    <Input
                        readOnly={readOnly}
                        type="text"
                        id="contactNumber"
                        placeholder="Contact Number"
                        minLength={10}
                        maxLength={10}
                        pattern='[0-9]{10}'
                        inputMode='numeric'
                        required
                    />
                </label>
                <label htmlFor="address" className='col-span-full'>
                    <p className='font-medium mb-1'>Address</p>
                    <Textarea readOnly={readOnly} id="address" placeholder="Address" required rows={5} />
                </label>
            </form>

            <AdminConnectWithTeam
                trigger={
                    <Button size={'lg'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit my-4')}>Connect</Button>
                }
            />

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
