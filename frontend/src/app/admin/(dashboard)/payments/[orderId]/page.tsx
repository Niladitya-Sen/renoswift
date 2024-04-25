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
import Link from "next/link";

type PaymentType = {
    orderId: string;
    amountPaid: number;
    amountDue: number;
    finalDueDate: string;
    paymentMethod: string;
    payments: {
        phase: string;
        amount: number;
        dueDate: string;
        status: string;
    }[];
}

function PaymentTableRow({ phase, amount, dueDate, status }: Readonly<{ phase: string, amount: number, dueDate: string, status: string }>) {
    return (
        <TableRow>
            <TableCell>{phase.charAt(0).toUpperCase() + phase.slice(1)}</TableCell>
            <TableCell>{amount.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
            })}</TableCell>
            <TableCell>{dayjs(dueDate).format("DD/MM/YYYY")}</TableCell>
            <TableCell>{status === "done" ? "Paid" : "Pending"}</TableCell>
        </TableRow>
    )
}

async function getPayments(orderId: string): Promise<PaymentType> {
    const cookieStore = cookies();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/payment/${orderId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function PaymentDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const payment = await getPayments(orderId);
    const totalAmount = payment.payments.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="relative">
            <Link href={"/admin/payments"} className={cn('absolute -top-14 right-2')}>
                <Button variant={"outline"} className={cn('border-primary text-primary hover:text-primary')}>
                    <span title='back'>back</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Order ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Amount Paid</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Amount Due</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Final Due Date</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Payment Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{payment.orderId}</TableCell>
                        <TableCell>{payment.amountPaid.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        })}</TableCell>
                        <TableCell>{payment.amountDue.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        })}</TableCell>
                        <TableCell>{dayjs(payment.finalDueDate).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>Visa Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="max-w-screen-lg mx-auto mt-10">
                <Table>
                    <TableHeader className={cn('bg-primary')}>
                        <TableRow>
                            <TableHead className={cn('text-primary-foreground')}>Phase</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Amount</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Due Date</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payment.payments.map((payment, index) => (
                            <PaymentTableRow key={index} {...payment} />
                        ))}
                        <TableRow className="bg-gray-200">
                            <TableCell className="font-semibold">Total:</TableCell>
                            <TableCell colSpan={3} className="font-semibold">{totalAmount.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            })}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
