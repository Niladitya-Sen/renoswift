import AdminAddSupplierDialog from '@/components/custom/admin/AdminAddSupplierDialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";

export default function Suppliers() {
    return (
        <>            
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Supplier ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Email</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                        <TableHead className={cn('text-white')}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3].map(e => (
                            <TableRow key={e}>
                                <TableCell className="font-medium">{"pdkfuh1256"}</TableCell>
                                <TableCell>Rahul Sharma</TableCell>
                                <TableCell>rahul@gmail.com</TableCell>
                                <TableCell>7894567851</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>
                                    <Link href={`/admin/suppliers/${"pdkfuh1256"}`} className='flex gap-4 items-center justify-end'>
                                        <Button variant={'ghost'} size={'icon'}>
                                            <FaEye className='text-sky-500' />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className='bg-white w-full sticky bottom-0'>
                <AdminAddSupplierDialog
                    trigger={
                        <Button className={cn('mx-auto flex mt-4')}>
                            Add Supplier
                        </Button>
                    }
                />
            </div>
        </>
    )
}
