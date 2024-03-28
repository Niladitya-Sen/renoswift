import AdminAddSupplierDialog from '@/components/custom/admin/AdminAddSupplierDialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";

type SupplierType = {
    supplierId: string;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
}

async function getSuppliers(): Promise<SupplierType[]> {
    const cookiesStore = cookies();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/suppliers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookiesStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;
}

export default async function Suppliers() {
    const suppliers = await getSuppliers();

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
                        suppliers.map(supplier => (
                            <TableRow key={supplier.supplierId}>
                                <TableCell className="font-medium">{supplier.supplierId}</TableCell>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.phoneNumber}</TableCell>
                                <TableCell>{supplier.isActive ? "Active" : "Inactive"}</TableCell>
                                <TableCell>
                                    <Link href={`/admin/suppliers/${supplier.supplierId}`} className='flex gap-4 items-center justify-end'>
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
