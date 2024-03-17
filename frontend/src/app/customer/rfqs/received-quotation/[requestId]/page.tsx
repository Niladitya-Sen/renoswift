import React from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IoArrowBack } from "react-icons/io5"
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import CustomerPaymentButton from '@/components/custom/customer/CustomerPaymentButton';
import CustomerConnectWithTeam from '@/components/custom/customer/CustomerConnectWithTeam';

type QuoteDetailType = {
    quoteId: string;
    createdDate: string;
    name: string;
    email: string;
    contactNumber: string;
    propertyId: string;
    customerRemarks: string;
    teamRemarks: string;
    timeline: string;
    designPlan: string;
    quotation: string;
    isPaid: boolean;
};

async function getQuoteDetails(quoteId: string): Promise<QuoteDetailType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/quotation/received/${quoteId}`, {
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

export default async function ReceivedQuotationDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const quote = await getQuoteDetails(requestId);

    return (
        <div>
            <Link href={"/customer/rfqs/received-quotation"} className={cn('block ml-auto w-fit')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
                    <span title='back'>BACK</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Response</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{requestId}</TableCell>
                        <TableCell>{dayjs(quote.createdDate).format('DD/MM/YYYY')}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className='flex flex-col relative sm:grid sm:grid-cols-2 my-10 gap-4 px-5'>
                <div className={cn('absolute w-full -top-[3rem] backdrop-blur-sm', {
                    'hidden': quote.isPaid
                })}>
                    <div className='rounded-lg bg-primary max-w-[18rem] p-4 text-center ml-auto'>
                        <p className='font-semibold text-white'>Unlock the design with a minimal payment of ₹2,000</p>
                        <CustomerPaymentButton
                            title='Pay'
                            amount={2000}
                            quoteId={quote.quoteId}
                            phase='design'
                            className={cn('bg-blue-500 hover:bg-blue-600 text-white mt-4')}
                        />
                    </div>
                </div>
                <label htmlFor="designPlan">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="designPlan" value={quote.designPlan.split("/").at(-1)} name="designPlan" className={cn('border-0')} />
                        <Link href={process.env.NEXT_PUBLIC_API_URL + quote.designPlan} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="designPlanLink">
                    <p className='font-semibold'>Remodeling Design Plan</p>
                    <Link target='_blank' href={process.env.NEXT_PUBLIC_API_URL + quote.designPlan}>
                        <Input readOnly type="text" id="designPlanLink" name="designPlanLink" className='w-full border p-2 rounded-sm mt-1 cursor-pointer' value={process.env.NEXT_PUBLIC_API_URL + quote.designPlan} />
                    </Link>
                </label>
                <label htmlFor="quotation">
                    <p className='font-semibold'>Quotation</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" value={quote.quotation.split("/").at(-1)} name="quotation" className={cn('border-0')} />
                        <Link href={process.env.NEXT_PUBLIC_API_URL + quote.quotation} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Delivery Timeline</p>
                    <Input readOnly type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' value={quote.timeline} />
                </label>
                <label htmlFor="teamRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Team</p>
                    <Input readOnly type="text" id="teamRemarks" name="teamRemarks" className='w-full border p-2 rounded-sm mt-1' value={quote.teamRemarks} />
                </label>
            </div>
            <div className='flex gap-4 items-center justify-center w-full col-span-full mt-2 mb-4'>
                <CustomerConnectWithTeam
                    trigger={
                        <Button variant={'outline'} size={'lg'} className={cn('border-2 border-primary text-primary hover:text-primary')}>
                            Connect With Team
                        </Button>
                    }
                />

                {quote.isPaid && (
                    <CustomerPaymentButton
                        title='Confirm Order & Pay'
                        amount={10000}
                        quoteId={quote.quoteId}
                        phase='order'
                    />
                )}
            </div>
        </div>
    );
};

