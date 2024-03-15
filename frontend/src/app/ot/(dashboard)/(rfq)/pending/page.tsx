import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Pending() {
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
                            <Link href={`/ot/pending/RS00R219`} className={'px-4 py-2 rounded-lg border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200'}>View</Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
