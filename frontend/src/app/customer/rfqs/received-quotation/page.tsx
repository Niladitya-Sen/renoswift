import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Link from 'next/link';

type ReceivedQuotationType = {
    quoteId: string;
    createdDate: string;
}[];

async function getReceivedQuotes(): Promise<ReceivedQuotationType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/quotation/received?limit=10&pageNo=1`, {
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

export default async function ReceivedQuotation() {
    const quotes = await getReceivedQuotes();

    console.log(quotes);

    return (
        <div>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Response</TableHead>
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
                                    <Link href={`/customer/rfqs/received-quotation/${quote.quoteId}`} className={'px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200'}>View</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>

    )
}
