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
import Link from 'next/link';
import { FaEye } from "react-icons/fa6";

export default function RFQs() {
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
                    <TableRow>
                        <TableCell className="font-medium">RS00R219</TableCell>
                        <TableCell>15/02/24</TableCell>
                        <TableCell>Rahul Sharma</TableCell>
                        <TableCell>rahul@gmail.com</TableCell>
                        <TableCell>7894567851</TableCell>
                        <TableCell>
                            <Link href={`/admin/rfqs/RS00R219`}>
                                <Button variant={'ghost'} size={'icon'}>
                                    <FaEye className='text-primary text-xl' />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
