"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FileInput from '../FileInput';
import AdminBrandSelect from './AdminBrandSelect';
import AdminProductCategorySelect from './AdminProductCategorySelect';
import AdminSupplierSelect from './AdminSupplierSelect';


export default function AdminAddProductDialog({ trigger }: Readonly<{ trigger: React.ReactNode }>) {
    const dialogCloseRef = React.useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.currentTarget).entries()));
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`, {
                method: 'POST',
                body: new FormData(e.currentTarget),
                headers: {
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`,
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                router.refresh();
                dialogCloseRef.current?.click();
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive'
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while adding the product. Please try again later.",
                variant: 'destructive'
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn('max-w-screen-lg max-h-screen overflow-y-auto')}>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <form
                    className='grid grid-cols-2 sm:grid-cols-3 gap-4'
                    onReset={() => {
                        dialogCloseRef.current?.click();
                    }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">
                        <p className='font-medium mb-1'>Name</p>
                        <Input type="text" name="name" id="name" placeholder="Name" required />
                    </label>
                    <label htmlFor="productId">
                        <p className='font-medium mb-1'>Product Id</p>
                        <Input type="text" name="productId" id="productId" placeholder="Employee Id" required />
                    </label>
                    <label htmlFor="category">
                        <p className='font-medium mb-1'>Category</p>
                        <AdminProductCategorySelect />
                    </label>
                    <label htmlFor="supplier">
                        <p className='font-medium mb-1'>Supplier</p>
                        <AdminSupplierSelect />
                    </label>
                    <label htmlFor="brand">
                        <p className='font-medium mb-1'>Brand</p>
                        {/* <Input type="text" name="brand" id="brand" placeholder="Brand" required /> */}
                        <AdminBrandSelect name="brand" id="brand" placeholder='Brand' required />
                    </label>
                    <label htmlFor="price">
                        <p className='font-medium mb-1'>Price</p>
                        <Input type="text" name="price" id="price" placeholder="Price" required />
                    </label>
                    <label htmlFor="productDetails" className='col-span-full'>
                        <p className='font-medium mb-1'>Product Details</p>
                        <Textarea id="productDetails" name="productDetails" placeholder="Product Details" required rows={6} />
                    </label>
                    <div className='col-span-full'>
                        <p className='font-medium mb-1'>Add Photos</p>
                        <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-2xl'>
                            <FileInput name="product-1" id="1" accept='image/*' required />
                            <FileInput name="product-2" id="2" accept='image/*' required />
                            <FileInput name="product-3" id="3" accept='image/*' required />
                            <FileInput name="product-4" id="4" accept='image/*' required />
                        </div>
                    </div>
                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button size={'lg'} disabled={loading}>
                            {
                                loading ? 'Adding Product...' : 'Submit'
                            }
                        </Button>
                    </div>
                </form>
                {<DialogClose ref={dialogCloseRef} className={cn('absolute')} />}
            </DialogContent>
        </Dialog>

    )
}
