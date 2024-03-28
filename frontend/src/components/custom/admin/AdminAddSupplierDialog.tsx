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
import React, { useRef } from 'react';
import AdminBrandSelect from './AdminBrandSelect';

export default function AdminAddSupplierDialog({ trigger }: { trigger: React.ReactNode }) {
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(Object.fromEntries(new FormData(e.currentTarget).entries()));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/suppliers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`
                },
                body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                });
                router.refresh();
                dialogCloseRef.current?.click();
            } else {
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An error occurred while adding a supplier. Please try again later.',
                variant: 'destructive'
            })
        }
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
                        <Input type="text" name="name" id="name" placeholder="Name" required />
                    </label>
                    <label htmlFor="supplierId">
                        <p className='font-medium mb-1'>Supplier Id</p>
                        <Input type="text" name="supplierId" id="supplierId" placeholder="supplier Id" required />
                    </label>
                    <label htmlFor="spoc">
                        <p className='font-medium mb-1'>SPOC</p>
                        <Input type="text" name="spoc" id="spoc" placeholder="SPOC" required />
                    </label>
                    <label htmlFor="email">
                        <p className='font-medium mb-1'>Email</p>
                        <Input type="email" name="email" id="email" placeholder="Email" inputMode='email' required />
                    </label>
                    <label htmlFor="contactNumber">
                        <p className='font-medium mb-1'>Contact Number</p>
                        <Input
                            type="text"
                            name="contactNumber"
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
                        <Input type="text" name="yearOperation" id="yearOperation" placeholder="Years in Operation" required />
                    </label>
                    <label htmlFor="brandDealings" className='col-span-2'>
                        <p className='font-medium mb-1'>Brand Dealings</p>
                        <AdminBrandSelect name="brandDealings" id="brandDealings" isMulti />
                    </label>
                    <label htmlFor="address" className='col-span-full'>
                        <p className='font-medium mb-1'>Address</p>
                        <Textarea id="address" name="address" placeholder="Address" required rows={5} />
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
