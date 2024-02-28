import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaEye } from "react-icons/fa6";

export default function Products() {
    return (
        <>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Product ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Category</TableHead>
                        <TableHead className={cn('text-white')}>Brand</TableHead>
                        <TableHead className={cn('text-white')}>Availability</TableHead>
                        <TableHead className={cn('text-white')}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">RS012588</TableCell>
                        <TableCell>Relaxa Acrylic Bathtub</TableCell>
                        <TableCell>Bathtub</TableCell>
                        <TableCell>Hindware</TableCell>
                        <TableCell>In Stock</TableCell>
                        <TableCell>
                            <Link href={`/admin/suppliers/${"pdkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                <Button variant={'ghost'} size={'icon'}>
                                    <FaEye className='text-primary text-xl' />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">RS012588</TableCell>
                        <TableCell>Relaxa Acrylic Bathtub</TableCell>
                        <TableCell>Bathtub</TableCell>
                        <TableCell>Hindware</TableCell>
                        <TableCell>In Stock</TableCell>
                        <TableCell>
                            <Link href={`/admin/suppliers/${"pdkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                <Button variant={'ghost'} size={'icon'}>
                                    <FaEye className='text-primary text-xl' />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">RS012588</TableCell>
                        <TableCell>Relaxa Acrylic Bathtub</TableCell>
                        <TableCell>Bathtub</TableCell>
                        <TableCell>Hindware</TableCell>
                        <TableCell>In Stock</TableCell>
                        <TableCell>
                            <Link href={`/admin/suppliers/${"pdkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                <Button variant={'ghost'} size={'icon'}>
                                    <FaEye className='text-primary text-xl' />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Button className={cn('flex mx-auto')}>Add Product</Button>
        </>
    )
}
