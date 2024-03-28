import StatusTrackingDialog from "@/components/custom/StatusTrackingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { IoArrowBack } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";

type OrderDetailsType = {
    orderId: string;
    createdDate: string;
    totalAmount: number;
    status: string;
    orderStatus?: {
        status: string;
        remarks: string;
        createdDate: string;
        imageURL: string;
    };
};

async function getOrderDetails(orderId: string): Promise<OrderDetailsType> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/order/${orderId}`, {
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

export default async function OrderDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const order = await getOrderDetails(orderId);

    return (
        <section>
            <Link href={"/customer/order"} className={cn('ml-auto block w-fit')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
                    <span title='back'>BACK</span>
                </Button>
            </Link>
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
                    <TableRow>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
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
                        <TableCell className={cn('flex items-center justify-end')}>
                            <StatusTrackingDialog
                                orderId={orderId}
                                trigger={
                                    <Button variant={"outline"} className={cn('border-primary border-2')}>
                                        <TbProgress className="text-lg" />
                                        <span className="ml-2">Track Progress</span>
                                    </Button>
                                }
                                role="customer"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="max-w-4xl w-full px-5 space-y-6 mt-6">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-full">
                        <p className='font-semibold'>Current Status</p>
                        <Input readOnly type="text" id="currentStatus" name="currentStatus" className='w-full border p-2 rounded-sm mt-1' value={order.orderStatus?.status} />
                    </div>
                    <div className="w-full">
                        <p className='font-semibold'>Last Updated On</p>
                        <Input readOnly type="text" id="lastUpdate" name="lastUpdate" className='w-full border p-2 rounded-sm mt-1' value={order.orderStatus?.createdDate && dayjs(order.orderStatus?.createdDate).format("DD/MM/YYYY")} />
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Remarks</p>
                    <textarea readOnly id="remarks" name="remarks" className='w-full border p-2 rounded-sm mt-1 min-h-[6rem]' value={order.orderStatus?.remarks} />
                </div>
                <div className="max-w-md">
                    <p className='font-semibold'>Updated Photos</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" name="quotation" className={cn('border-0')} value={order.orderStatus?.imageURL.split("/").at(-1)} />
                        <Link
                            href={order.orderStatus?.imageURL ? process.env.NEXT_PUBLIC_API_URL + order.orderStatus?.imageURL : ""}
                            target="_blank"
                            className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
