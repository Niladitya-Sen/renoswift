import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Link from 'next/link';
import { FaEye } from "react-icons/fa6";

type QuoteType = {
    quoteId: string;
    createdDate: string;
    name: string;
    email: string;
    contactNumber: string;
}

async function getQuotes(): Promise<QuoteType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/quotation/raised?limit=10&pageNo=1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function RFQs() {
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
                    {
                        quotes.map(quote => (
                            <TableRow key={quote.quoteId}>
                                <TableCell className="font-medium">{quote.quoteId}</TableCell>
                                <TableCell>{dayjs(quote.createdDate).format("DD/MM/YYYY")}</TableCell>
                                <TableCell>{quote.name}</TableCell>
                                <TableCell>{quote.email}</TableCell>
                                <TableCell>{quote.contactNumber}</TableCell>
                                <TableCell>
                                    <Link href={`/admin/rfqs/${quote.quoteId}`}>
                                        <Button variant="link">
                                            <FaEye className={cn('text-primary text-xl')} />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}