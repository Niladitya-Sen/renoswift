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
import Link from "next/link";

export default function Orders() {
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
                <TableRow>
                    <TableCell className="font-medium">--</TableCell>
                    <TableCell>21/04/24</TableCell>
                    <TableCell>&#8377;51,677</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell className={cn('flex items-center justify-end')}>
                        <Button>Generate Order ID</Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">ORD786856</TableCell>
                    <TableCell>21/04/24</TableCell>
                    <TableCell>&#8377;51,677</TableCell>
                    <TableCell>Confirmed</TableCell>
                    <TableCell className={cn('flex items-center justify-end')}>
                        <Link href="/ot/orders/ORD786856" className={cn(buttonVariants({
                            variant: 'outline'
                        }), 'border-primary')}>View</Link>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
