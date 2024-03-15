"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IoArrowBack } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PendingDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const [formData, setFormData] = useState<Record<string, string | File>>();

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (e.target.type === 'file') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    }

    return (
        <div>
            <Link href={"/ot/pending"} className={cn('block ml-auto w-fit')}>
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
            <form className='flex flex-col sm:grid sm:grid-cols-2 mt-10 mb-5 gap-4 px-5' onChange={handleChange}>
                <label htmlFor="designPlan">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input type="file" accept='application/pdf' id="designPlan" name="designPlan" className={cn('border-0')} />
                        {
                            formData?.designPlan ? (
                                <Link href={URL.createObjectURL(formData?.designPlan as File)} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                                    View
                                </Link>
                            ) : (
                                <label htmlFor="designPlan" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                                    Upload
                                </label>
                            )
                        }
                    </div>
                </label>
                <label htmlFor="designPlanLink">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <Input type="text" id="designPlanLink" name="designPlanLink" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="quotation">
                    <p className='font-semibold'>Quotation</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input type="file" accept='application/pdf' id="quotation" name="quotation" className={cn('border-0')} />
                        {
                            formData?.quotation ? (
                                <Link href={URL.createObjectURL(formData?.quotation as File)} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                                    View
                                </Link>
                            ) : (
                                <label htmlFor="quotation" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                                    Upload
                                </label>
                            )
                        }
                    </div>
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Delivery Timeline</p>
                    <Input type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="teamRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Team</p>
                    <Input type="text" id="teamRemarks" name="teamRemarks" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="customerRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Customer</p>
                    <Input type="text" id="customerRemarks" name="customerRemarks" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                    <Button variant={'outline'} className={cn('border-2 border-primary text-primary hover:text-primary')}>Cancel</Button>
                    <Button>Submit</Button>
                </div>
            </form>
        </div>
    )
}
