import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IoArrowBack } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RFQDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    return (
        <div className='relative'>
            <Link href={"/admin/rfqs"} className={cn('absolute right-2 -top-16')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
                    <span title='back'>back</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Request</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Name</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Email</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{requestId}</TableCell>
                        <TableCell>15/02/24</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 gap-y-4 gap-x-2 mt-10'>
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultVideo.png' alt='placeholder' width={200} height={200} />
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
            </div>
            <div className='flex flex-col sm:grid sm:grid-cols-3 my-10 gap-4'>
                <label htmlFor="dimensions">
                    <p className='font-semibold'>*Dimensions</p>
                    <Input type="text" id="dimensions" name="dimensions" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="budget">
                    <p className='font-semibold'>*Budget</p>
                    <Input type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="issues">
                    <p className='font-semibold'>*Functional Issues</p>
                    <Input type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="objective">
                    <p className='font-semibold'>*Objective for remodeling</p>
                    <Input type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="style">
                    <p className='font-semibold'>*Preferred style</p>
                    <Input type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>*Timeline</p>
                    <Input type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="request" className='col-span-2'>
                    <p className='font-semibold'>*Special request</p>
                    <Input type="text" id="request" name="request" className='w-full border p-2 rounded-sm mt-1' />
                </label>
            </div>
        </div>
    )
}
