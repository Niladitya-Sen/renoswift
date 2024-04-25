import { buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";

type PaymentType = {
    orderId: string;
    amountPaid: number;
    amountDue: number;
    finalDueDate: string;
    paymentMethod: string;
}

async function getPayments(): Promise<PaymentType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/payment`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('otToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function Payments() {

    const payments = await getPayments();

    return (
        <Table>
            <TableHeader className={cn('bg-primary')}>
                <TableRow>
                    <TableHead className={cn('text-primary-foreground')}>Order ID</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Amount Paid</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Amount Due</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Final Due Date</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Payment Method</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    payments.map(payment => (
                        <TableRow key={payment.orderId}>
                            <TableCell className="font-medium">{payment.orderId}</TableCell>
                            <TableCell>&#8377;{payment.amountPaid}</TableCell>
                            <TableCell>&#8377;{payment.amountDue}</TableCell>
                            <TableCell>{dayjs(payment.finalDueDate).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>Visa Card</TableCell>
                            <TableCell className={cn('flex items-center justify-end')}>
                                <Link href={`/ot/payments/${payment.orderId}`} className={cn(buttonVariants({
                                    variant: 'outline'
                                }), 'border-primary')}>View</Link>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
