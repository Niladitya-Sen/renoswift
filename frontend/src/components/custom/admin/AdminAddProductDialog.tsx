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
import { cn } from '@/lib/utils';
import React from 'react';
import FileInput from '../FileInput';


export default function AdminAddProductDialog({ trigger }: Readonly<{ trigger: React.ReactNode }>) {
    const dialogCloseRef = React.useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        dialogCloseRef.current?.click();
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
                        <Input type="text" id="name" placeholder="Name" required />
                    </label>
                    <label htmlFor="productId">
                        <p className='font-medium mb-1'>Product Id</p>
                        <Input type="text" id="productId" placeholder="Employee Id" required />
                    </label>
                    <label htmlFor="category">
                        <p className='font-medium mb-1'>Category</p>
                        <Input type="text" id="category" placeholder="Category" required />
                    </label>
                    <label htmlFor="supplier">
                        <p className='font-medium mb-1'>Supplier</p>
                        <Input type="text" id="supplier" placeholder="supplier" required />
                    </label>
                    <label htmlFor="brand">
                        <p className='font-medium mb-1'>Brand</p>
                        <Input type="text" id="brand" placeholder="Brand" required />
                    </label>
                    <label htmlFor="price">
                        <p className='font-medium mb-1'>Price</p>
                        <Input type="text" id="price" placeholder="Price" required />
                    </label>
                    <label htmlFor="productDetails" className='col-span-full'>
                        <p className='font-medium mb-1'>Product Details</p>
                        <Textarea id="productDetails" placeholder="Product Details" required rows={6} />
                    </label>
                    <div className='col-span-full'>
                        <p className='font-medium mb-1'>Add Photos</p>
                        <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-2xl'>
                            <FileInput name="1" id="1" accept='image/*' />
                            <FileInput name="2" id="2" accept='image/*' />
                            <FileInput name="3" id="3" accept='image/*' />
                            <FileInput name="4" id="4" accept='image/*' />
                        </div>
                    </div>
                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button size={'lg'}>Submit</Button>
                    </div>
                </form>
                {<DialogClose ref={dialogCloseRef} className={cn('absolute')} />}
            </DialogContent>
        </Dialog>

    )
}
