"use client";

import OperationsTeamStatusTrackingDialog from "@/components/custom/ot/OperationsTeamStatusTrackingDialog";
import OperationsTeamUpdateStatusDialog from "@/components/custom/ot/OperationsTeamUpdateStatusDialog";
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
import Link from "next/link";
import { useState } from "react";
import { TbProgress } from "react-icons/tb";

export default function OrderDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);

    return (
        <section>
            <OperationsTeamUpdateStatusDialog open={statusDialogOpen} onOpenChange={() => {
                setStatusDialogOpen(false);
            }} />
            <OperationsTeamStatusTrackingDialog open={trackingDialogOpen} onOpenChange={() => {
                setTrackingDialogOpen(false);
            }} />
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
                        <TableCell className="font-medium">{orderId}</TableCell>
                        <TableCell>21/04/24</TableCell>
                        <TableCell>&#8377;51,677</TableCell>
                        <TableCell>Confirmed</TableCell>
                        <TableCell className={cn('flex items-center justify-end')}>
                            <Button variant={"outline"} className={cn('border-primary border-2')} onClick={() => {
                                setTrackingDialogOpen(true);
                            }}>
                                <TbProgress className="text-lg" />
                                <span className="ml-2">Track Progress</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="max-w-4xl w-full px-5 space-y-6">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-full">
                        <p className='font-semibold'>Current Status</p>
                        <Input readOnly type="text" id="currentStatus" name="currentStatus" className='w-full border p-2 rounded-sm mt-1' value={'Piping'} />
                    </div>
                    <div className="w-full">
                        <p className='font-semibold'>Last Updated On</p>
                        <Input readOnly type="text" id="lastUpdate" name="lastUpdate" className='w-full border p-2 rounded-sm mt-1' value={'5 March 2024'} />
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Remarks</p>
                    <textarea readOnly id="remarks" name="remarks" className='w-full border p-2 rounded-sm mt-1 min-h-[6rem]' value={'5 March 2024'} />
                </div>
                <div className="max-w-md">
                    <p className='font-semibold'>Updated Photos</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" name="quotation" className={cn('border-0')} value={'renovation.png'} />
                        <Link href={"#"} target="_blank" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                            View
                        </Link>
                    </div>
                </div>
            </div>
            <Button size={'lg'} className="mx-auto flex" onClick={() => {
                setStatusDialogOpen(true);
            }}>Update Status</Button>
        </section>
    )
}
