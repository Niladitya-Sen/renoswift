"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import FileInput from '@/components/custom/FileInput';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AdminSupplierSelect from '@/components/custom/admin/AdminSupplierSelect';
import { useCookies } from '@/hooks/useCookies';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

type ProductDetailsType = {
    productId: string;
    name: string;
    category: string;
    brand: string;
    isActive: boolean;
    price: number;
    supplierId: string;
    details: string;
    images: string[];
};

export default function ProductDetails({ params: { productId } }: Readonly<{ params: { productId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);
    const [product, setProduct] = useState<ProductDetailsType>();
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    async function getProductDetails() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies?.get('adminToken')}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            setProduct(data);
        } else {
            console.error(data);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    async function updateProductDetails(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(Object.fromEntries(new FormData(e.currentTarget).entries()));
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`,
                },
                body: new FormData(e.currentTarget)
            });
            const data = await response.json();
            if (response.ok) {
                setReadOnly(true);
                getProductDetails();
                toast({
                    title: "Success",
                    description: "Product details updated successfully",
                });
                setReadOnly(true);
            } else {
                console.error(data);
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong while updating product details. Please try again later.",
                variant: "destructive"
            });
        }
    }

    async function deleteProduct() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Product deleted successfully",
                });
                router.push('/admin/products');
            } else {
                console.error(data);
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong while deleting product. Please try again later.",
                variant: "destructive"
            });
        }
    }

    return (
        <div className='relative'>
            <Link href={`/admin/products`} className={cn('absolute -top-12 right-2 block')}>
                <Button size={'sm'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit')}>Back</Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Product ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Category</TableHead>
                        <TableHead className={cn('text-white')}>Brand</TableHead>
                        <TableHead className={cn('text-white')}>Availability</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{product?.productId}</TableCell>
                        <TableCell>{product?.name}</TableCell>
                        <TableCell>{product?.category}</TableCell>
                        <TableCell>{product?.brand}</TableCell>
                        <TableCell>{product?.isActive ? "In Stock" : "Out of Stock"}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form ref={formRef} className='grid grid-cols-2 gap-6 max-w-2xl mt-6' onSubmit={updateProductDetails}>
                <div className={cn('grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-3xl col-span-full', {
                    'hidden': !readOnly
                })}>
                    {
                        product?.images.map((image, index) => (
                            <div key={index} className='relative'>
                                <Image
                                    src={process.env.NEXT_PUBLIC_API_URL + image}
                                    alt="product image"
                                    width={200}
                                    height={200}
                                    className='object-cover object-center w-full rounded-lg flex-1 max-h-[160px]'
                                />
                            </div>
                        ))
                    }
                </div>
                <div className={cn('grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-3xl col-span-full', {
                    'hidden': readOnly
                })}>
                    <FileInput readOnly={readOnly} name="product-1" id="1" accept='image/*' />
                    <FileInput readOnly={readOnly} name="product-2" id="2" accept='image/*' />
                    <FileInput readOnly={readOnly} name="product-3" id="3" accept='image/*' />
                    <FileInput readOnly={readOnly} name="product-4" id="4" accept='image/*' />
                </div>
                <label htmlFor="supplier">
                    <p className='font-medium mb-1'>Supplier</p>
                    <AdminSupplierSelect readOnly={readOnly} defaultValue={[product?.supplierId as string]} />
                </label>
                <label htmlFor="price">
                    <p className='font-medium mb-1'>Price</p>
                    <Input readOnly={readOnly} type="text" name="price" id="price" placeholder="Price" required defaultValue={product?.price} />
                </label>
                <label htmlFor="productDetails" className='col-span-full'>
                    <p className='font-medium mb-1'>Product Details</p>
                    <Textarea readOnly={readOnly} id="productDetails" placeholder="Product Details" required rows={6} defaultValue={product?.details} name="productDetails" />
                </label>
            </form>
            <div className='flex items-center justify-center gap-4 mt-4'>
                <Button type='reset' className={cn({
                    'hidden': readOnly
                })} variant={'destructive'} size={'lg'} onClick={() => { setReadOnly(true) }}>Cancel</Button>
                <Button type='reset' className={cn({
                    'hidden': !readOnly
                })} variant={'destructive'} size={'lg'} onClick={deleteProduct}>Delete</Button>
                <Button size={'lg'} onClick={() => {
                    if (readOnly) {
                        setReadOnly(false);
                    } else {
                        formRef.current?.requestSubmit();                       
                    }
                }}>
                    {readOnly ? 'Edit' : 'Save'}
                </Button>
            </div>
        </div>
    )
}
