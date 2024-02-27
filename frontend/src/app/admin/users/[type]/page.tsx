import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import { FaEye } from "react-icons/fa";

export default function UserType({ params: { type } }: Readonly<{ params: { type: string } }>) {
    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-sky-500')}>
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
                                    type === 'ot' ? (
                                        <TableCell>
                                            <div className='flex gap-4 items-center justify-end'>
                                                <Button variant={'ghost'} size={'icon'}>
                                                    <FaEye className='text-sky-500' />
                                                </Button>
                                            </div>
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
                type === 'ot' && (
                    <div className='bg-white w-full sticky bottom-0'>
                        <Button className={cn('bg-sky-500 hover:bg-sky-400 text-white mx-auto flex mt-4')}>Add Employee</Button>
                    </div>
                )
            }
        </div>
    )
}
