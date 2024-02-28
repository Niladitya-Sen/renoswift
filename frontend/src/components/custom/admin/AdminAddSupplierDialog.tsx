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


export default function AdminAddSupplierDialog({ trigger }: { trigger: React.ReactNode }) {
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
            <DialogContent className={cn('max-w-screen-lg')}>
                <DialogHeader>
                    <DialogTitle>Add Supplier</DialogTitle>
                </DialogHeader>
                <form
                    className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'
                    onReset={() => {
                        dialogCloseRef.current?.click();
                    }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">
                        <p className='font-medium mb-1'>Name</p>
                        <Input type="text" id="name" placeholder="Name" required />
                    </label>
                    <label htmlFor="supplierId">
                        <p className='font-medium mb-1'>Supplier Id</p>
                        <Input type="text" id="supplierId" placeholder="supplier Id" required />
                    </label>
                    <label htmlFor="spoc">
                        <p className='font-medium mb-1'>SPOC</p>
                        <Input type="text" id="spoc" placeholder="SPOC" required />
                    </label>
                    <label htmlFor="email">
                        <p className='font-medium mb-1'>Email</p>
                        <Input type="email" id="email" placeholder="Email" inputMode='email' required />
                    </label>
                    <label htmlFor="contactNumber">
                        <p className='font-medium mb-1'>Contact Number</p>
                        <Input
                            type="text"
                            id="contactNumber"
                            placeholder="Contact Number"
                            minLength={10}
                            maxLength={10}
                            pattern='[0-9]{10}'
                            inputMode='numeric'
                            required
                        />
                    </label>
                    <label htmlFor="yearOperation">
                        <p className='font-medium mb-1'>Years in Operation</p>
                        <Input type="text" id="yearOperation" placeholder="Years in Operation" required />
                    </label>
                    <label htmlFor="brandDealings" className='col-span-2'>
                        <p className='font-medium mb-1'>Brand Dealings</p>
                        <Input type="text" id="yearOperatiobrandDealings" placeholder="Brand Dealings" required />
                    </label>
                    <label htmlFor="address" className='col-span-full'>
                        <p className='font-medium mb-1'>Address</p>
                        <Textarea id="address" placeholder="Address" required rows={5} />
                    </label>
                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button size={'lg'}>Submit</Button>
                    </div>
                </form>
                <DialogClose ref={dialogCloseRef} />
            </DialogContent>
        </Dialog>

    )
}
