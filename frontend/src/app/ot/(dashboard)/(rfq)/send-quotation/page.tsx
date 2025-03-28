import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';

type QuoteType = {
    quoteId: string;
    createdDate: string;
    name: string;
    email: string;
    contactNumber: string;
}

async function getQuotes(): Promise<QuoteType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/quotation/send-quotation?limit=10&pageNo=1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('otToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function SendQuotation() {
    const quotes = await getQuotes();

    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Request</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Name</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Email</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Number</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* <TableRow>
                        <TableCell className="font-medium">RS00R219</TableCell>
                        <TableCell>15/02/24</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                        <TableCell>
                            <Link href={`/ot/send-quotation/RS00R219`} className={'px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200'}>View</Link>
                        </TableCell>
                    </TableRow> */}
                    {
                        quotes.map((quote: QuoteType) => {
                            return (
                                <TableRow key={quote.quoteId}>
                                    <TableCell className="font-medium">{quote.quoteId}</TableCell>
                                    <TableCell>{dayjs(quote.createdDate).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{quote.name}</TableCell>
                                    <TableCell>{quote.email}</TableCell>
                                    <TableCell>{quote.contactNumber}</TableCell>
                                    <TableCell>
                                        <Link href={`/ot/send-quotation/${quote.quoteId}`} className={'px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200'}>View</Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
