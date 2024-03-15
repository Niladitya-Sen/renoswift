import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cookies } from "next/headers";
import dayjs from 'dayjs';

type QuotationType = {
    quoteId: string;
    createdDate: string;
}[];

async function getQuotes(): Promise<QuotationType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/quotation/raised?limit=10&pageNo=1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('token')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function RRFQs() {
    const quotes = await getQuotes();

    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Request</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        quotes.map(quote => (
                            <TableRow key={quote.quoteId}>
                                <TableCell className="font-medium">{quote.quoteId}</TableCell>
                                <TableCell>{dayjs(quote.createdDate).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>
                                    <Link href={`/customer/rfqs/rrfq/${quote.quoteId}`} className={'px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200'}>View</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className='flex gap-4 items-center justify-center w-full col-span-full mt-2 mb-4'>
                <Button size={'lg'}>Raise another RFQ</Button>
            </div>
        </div>
    )
}
