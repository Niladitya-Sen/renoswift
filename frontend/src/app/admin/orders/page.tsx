import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaEye } from "react-icons/fa6";

export default function Orders() {
    return (
        <Table>
            <TableHeader className={cn('bg-primary')}>
                <TableRow>
                    <TableHead className={cn('text-white')}>Order ID</TableHead>
                    <TableHead className={cn('text-white')}>Order Placement Date</TableHead>
                    <TableHead className={cn('text-white')}>Amount Paid</TableHead>
                    <TableHead className={cn('text-white')}>Status</TableHead>
                    <TableHead className={cn('text-white')}></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    [1, 2, 3].map(e => (
                        <TableRow key={e}>
                            <TableCell className="font-medium">RS012588</TableCell>
                            <TableCell>21/02/24</TableCell>
                            <TableCell>{(51200).toLocaleString('en-IN', {
                                currency: 'INR',
                                style: 'currency'
                            })}</TableCell>
                            <TableCell>Confirmed</TableCell>
                            <TableCell>
                                <Link href={`/admin/orders/${"pdkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                    <Button variant={'ghost'} size={'icon'}>
                                        <FaEye className='text-primary text-xl' />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
