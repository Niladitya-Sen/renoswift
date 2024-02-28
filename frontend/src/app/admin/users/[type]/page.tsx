import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { FaEye } from "react-icons/fa";
import { notFound } from 'next/navigation';
import AdminAddEmployeeDialog from '@/components/custom/admin/AdminAddEmployeeDialog';
import Link from 'next/link';

export default function UserType({ params: { type } }: Readonly<{ params: { type: string } }>) {

    if (type !== 'customers' && type !== 'operations-team') {
        notFound();
    }

    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Customer ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Email</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                        <TableHead className={cn('text-white')}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                            <TableRow key={e}>
                                <TableCell className="font-medium">{type.slice(0, 3) + "dkfuh1256"}</TableCell>
                                <TableCell>Rahul Sharma</TableCell>
                                <TableCell>rahul@gmail.com</TableCell>
                                <TableCell>7894567851</TableCell>
                                <TableCell>Active</TableCell>
                                {
                                    type === 'operations-team' ? (
                                        <TableCell>
                                            <Link href={`/admin/users/operations-team/${type.slice(0, 3) + "dkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <FaEye className='text-sky-500' />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            <div className='flex gap-4 items-center justify-end'>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <FiEdit className='text-green-500' />
                                                </Button>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <RiDeleteBinLine className='text-red-500' />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {
                type === 'operations-team' && (
                    <div className='bg-white w-full sticky bottom-0'>
                        <AdminAddEmployeeDialog
                            trigger={
                                <Button className={cn('mx-auto flex mt-4')}>
                                    Add Employee
                                </Button>
                            }
                        />
                    </div>
                )
            }
        </div>
    )
}
