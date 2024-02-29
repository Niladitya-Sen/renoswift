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
import Link from "next/link";

const payments = [
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/04/24',
        status: 'Paid'
    },
];

function PaymentTableRow({ phase, amount, dueDate, status }: Readonly<{ phase: string, amount: number, dueDate: string, status: string }>) {
    return (
        <TableRow>
            <TableCell>{phase}</TableCell>
            <TableCell>&#8377;{amount}</TableCell>
            <TableCell>{dueDate}</TableCell>
            <TableCell>{status}</TableCell>
        </TableRow>
    )
}

export default function PaymentDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
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
                        <TableCell className="font-medium">{orderId}</TableCell>
                        <TableCell>&#8377;51,677</TableCell>
                        <TableCell>&#8377;1,71,704</TableCell>
                        <TableCell>21/04/24</TableCell>
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
                        {payments.map((payment, index) => (
                            <PaymentTableRow key={index} {...payment} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
