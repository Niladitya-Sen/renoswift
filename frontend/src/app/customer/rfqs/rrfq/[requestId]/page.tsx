import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { IoArrowBack, IoCloseOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import { FaEquals } from 'react-icons/fa'

type Asset = {
    id: number;
    type: "image" | "video";
    url: string;
}

type QuoteDetailsType = {
    quoteId: string;
    createdDate: string;
    propertyId: number;
    length: number;
    breadth: number;
    height: number;
    area: number;
    doors: number;
    windows: number;
    budget: string;
    issues: string;
    objective: string;
    style: string;
    timeline: string;
    specialRequest: string;
    address: string;
    assets: Asset[];
}

async function getQuoteDetails(quoteId: string): Promise<QuoteDetailsType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/quotation/raised/${quoteId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('token')?.value}`
        },
        cache: 'no-store'
    });
    const data = await response.json();
    return data;
}

export default async function RRFQDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const quoteDetails = await getQuoteDetails(requestId);

    return (
        <div>
            <Link href={"/customer/rfqs"} className={cn('block mb-2 ml-auto w-fit')}>
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{requestId}</TableCell>
                        <TableCell>{dayjs(quoteDetails.createdDate).format("DD/MM/YYYY")}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 gap-y-4 gap-x-2 mt-10'>
                {
                    quoteDetails.assets.map(asset => {
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
                <label htmlFor="area">
                    <p className='font-semibold'>*Dimensions (L &#x2715; B &#x2715; H)</p>
                    <div className="grid gap-2 grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] place-items-center">
                        <Input
                            required
                            readOnly
                            type="text"
                            id="length"
                            name="length"
                            value={quoteDetails.length}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <IoCloseOutline className='text-xl' />
                        <Input
                            required
                            readOnly
                            type="text"
                            id="breadth"
                            name="breadth"
                            value={quoteDetails.breadth}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <IoCloseOutline className='text-xl' />
                        <Input
                            required
                            readOnly
                            type="text"
                            id="height"
                            name="height"
                            value={quoteDetails.height}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <FaEquals className='text-xl' />
                        <Input
                            required
                            readOnly
                            value={quoteDetails.area}
                            type="text"
                            id="area"
                            name="area"
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                    </div>
                </label>
                <label htmlFor="budget">
                    <p className='font-semibold'>Budget(INR)</p>
                    <Input readOnly value={quoteDetails.budget} type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="issues">
                    <p className='font-semibold'>Functional Issues</p>
                    <Input readOnly value={quoteDetails.issues} type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="doors">
                    <p className='font-semibold'>*Number of doors</p>
                    <Input readOnly value={quoteDetails.doors} type="text" id="doors" name="doors" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="windows">
                    <p className='font-semibold'>*Number of windows</p>
                    <Input readOnly value={quoteDetails.windows} type="text" id="windows" name="windows" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="objective">
                    <p className='font-semibold'>Objective for Remodeling</p>
                    <Input readOnly value={quoteDetails.objective} type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="style">
                    <p className='font-semibold'>Preferred Style</p>
                    <Input readOnly value={quoteDetails.style} type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Timeline</p>
                    <Input readOnly value={quoteDetails.timeline} type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="specialRequest" className='col-span-2'>
                    <p className='font-semibold'>Special Request</p>
                    <Input readOnly value={quoteDetails.specialRequest} type="text" id="specialRequest" name="specialRequest" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="address" className='col-span-2'>
                    <p className='font-semibold'>Address</p>
                    <Input readOnly value={quoteDetails.address} type="text" id="address" name="address" className='w-full border p-2 rounded-sm mt-1' />
                </label>
            </div>
        </div>
    )
}
