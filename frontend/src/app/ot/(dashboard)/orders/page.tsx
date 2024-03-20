import OperationsTeamGenerateOrderIdButton from "@/components/custom/ot/OperationsTeamGenerateOrderIdButton";
import { Button, buttonVariants } from "@/components/ui/button";
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
    id: number;
    orderId: string;
    createdDate: string;
    totalAmount: number;
    status: string;
};

async function getOrders(): Promise<OrderType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('otToken')?.value}`
        },
        cache: 'no-store'
    });
    const data = await response.json();
    return data;
}

export default async function Orders() {
    const orders = await getOrders();

    console.log(orders);

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
                    orders.map((order) => (
                        <TableRow key={order.id}>
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
                                order.status === 'confirmed' ? (
                                    <TableCell className={cn('flex items-center justify-end')}>
                                        <Link href={`/ot/orders/${order.orderId}`} className={cn(buttonVariants({
                                            variant: 'outline'
                                        }), 'border-primary')}>View</Link>
                                    </TableCell>
                                ) : (
                                    <TableCell className={cn('flex items-center justify-end')}>
                                        <OperationsTeamGenerateOrderIdButton orderId={order.id} />
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
