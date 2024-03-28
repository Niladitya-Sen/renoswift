import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaEye } from "react-icons/fa6";
import AdminAddProductDialog from '@/components/custom/admin/AdminAddProductDialog';
import { cookies } from 'next/headers';

type ProductsType = {
    productId: string;
    name: string;
    category: string;
    brand: string;
    isActive: boolean;
}

async function getProducts(): Promise<ProductsType[]> {
    const cookieStore = cookies();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('adminToken')?.value}`
        }
    });
    const data = await response.json();
    return data;

}

export default async function Products() {
    const products = await getProducts();

    return (
        <>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Product ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Category</TableHead>
                        <TableHead className={cn('text-white')}>Brand</TableHead>
                        <TableHead className={cn('text-white')}>Availability</TableHead>
                        <TableHead className={cn('text-white')}></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map(product => (
                            <TableRow>
                                <TableCell className="font-medium">{product.productId}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.isActive ? "In Stock" : "Out of stock"}</TableCell>
                                <TableCell>
                                    <Link href={`/admin/products/${product.productId}`} className='flex gap-4 items-center justify-end'>
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

            <AdminAddProductDialog
                trigger={
                    <Button className={cn('flex mx-auto')}>Add Product</Button>
                }
            />
        </>
    )
}
