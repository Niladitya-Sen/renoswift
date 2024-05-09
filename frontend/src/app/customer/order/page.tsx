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

type OrderType = {
    orderId: string;
    createdDate: string;
    totalAmount: number;
    status: string;
};

async function getOrders(): Promise<OrderType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/order`, {
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

export default async function Orders() {
    const orders = await getOrders();

    return (
        <Table>
            <TableHeader className={cn('bg-primary')}>
                <TableRow>
                    <TableHead className={cn('text-primary-foreground')}>Order ID</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Order Placement Date</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Amount Paid</TableHead>
                    <TableHead className={cn('text-primary-foreground')}>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{order.orderId ?? "--"}</TableCell>
                            <TableCell>{dayjs(order.createdDate).format("DD/MM/YYYY")}</TableCell>
                            <TableCell>
                                {
                                    order.totalAmount.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: 'INR'
                                    })
                                }
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
                            {
                                order.status === 'confirmed' && (
                                    <TableCell className={cn('flex items-center justify-end')}>
                                        <Link href={`/customer/order/${order.orderId}`} className={cn(buttonVariants({
                                            variant: 'outline'
                                        }), 'border-primary')}>View</Link>
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
