import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IoArrowBack } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'

type Asset = {
    id: number;
    type: "image" | "video";
    url: string;
}

type QuoteDetailType = {
    quoteId: string;
    createdDate: string;
    name: string;
    email: string;
    contactNumber: string;
    propertyId: number;
    length: number;
    breadth: number;
    budget: string;
    issues: string;
    objective: string;
    style: string;
    timeline: string;
    specialRequest: string;
    address: string;
    assets: Asset[];
}

async function getQuoteInDetail(id: string): Promise<QuoteDetailType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/quotation/raised/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('otToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function RFQDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const quote = await getQuoteInDetail(requestId);

    return (
        <div className='relative'>
            <Link href={"/ot"} className={cn('block ml-auto w-fit')}>
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
                        <TableCell>{dayjs(quote.createdDate).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{quote.name}</TableCell>
                        <TableCell>{quote.email}</TableCell>
                        <TableCell>{quote.contactNumber}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 gap-y-4 gap-x-2 mt-10'>
                {
                    quote.assets.map(asset => {
                        if (asset.type === 'image') {
                            return <Image key={asset.id} src={process.env.NEXT_PUBLIC_API_URL + "/static/images/" + asset.url} alt='placeholder' width={200} height={200} className='rounded-sm' />
                        } else {
                            return (
                                <video
                                    key={asset.id}
                                    src={process.env.NEXT_PUBLIC_API_URL + "/static/videos/" + asset.url}
                                    controls
                                    width={200}
                                    height={200}
                                    className='rounded-sm'
                                    controlsList='nodownload'
                                />
                            )
                        }
                    })
                }
            </div>
            <div className='flex flex-col sm:grid sm:grid-cols-3 my-10 gap-4'>
                <label htmlFor="dimensions">
                    <p className='font-semibold'>Dimensions</p>
                    <Input readOnly value={quote.length + "X" + quote.breadth} type="text" id="dimensions" name="dimensions" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="budget">
                    <p className='font-semibold'>Budget(INR)</p>
                    <Input readOnly value={quote.budget} type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="issues">
                    <p className='font-semibold'>Functional Issues</p>
                    <Input readOnly value={quote.issues} type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="objective">
                    <p className='font-semibold'>Objective for Remodeling</p>
                    <Input readOnly value={quote.objective} type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="style">
                    <p className='font-semibold'>Preferred Style</p>
                    <Input readOnly value={quote.style} type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Timeline</p>
                    <Input readOnly value={quote.timeline} type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="specialRequest" className='col-span-2'>
                    <p className='font-semibold'>Special Request</p>
                    <Input readOnly value={quote.specialRequest} type="text" id="specialRequest" name="specialRequest" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="address" className='col-span-2'>
                    <p className='font-semibold'>Address</p>
                    <Input readOnly value={quote.address} type="text" id="address" name="address" className='w-full border p-2 rounded-sm mt-1' />
                </label>
            </div>
        </div>
    )
}
