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


export default function PaymentUpdateDialog({ trigger }: { trigger: React.ReactNode }) {
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     

      
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
                    <label htmlFor="transaction">
                        <p className='font-medium mb-1'>Transaction ID</p>
                        <Input type="text" name="transaction" id="transaction" placeholder="Transaction Id" required />
                    </label>
                    <label htmlFor="supplierId">
                        <p className='font-medium mb-1'>Total Amount</p>
                        <Input type="text" name="supplierId" id="supplierId" placeholder="Total Amount" required />
                    </label>
                    <label htmlFor="spoc">
                        <p className='font-medium mb-1'> Balance Amount</p>
                        <Input type="text" name="spoc" id="spoc" placeholder=" Balance Amount" required />
                    </label>
                    <label htmlFor="email">
                        <p className='font-medium mb-1'>Mode of payment receive</p>
                        <Input type="email" name="email" id="email" placeholder="Mode of payment receive"  required />
                    </label>
                    <label htmlFor="contactNumber">
                        <p className='font-medium mb-1'>Amount Paid</p>
                        <Input
                            type="text"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Amount Paid"
                            minLength={10}
                            maxLength={10}
                            pattern='[0-9]{10}'
                            inputMode='numeric'
                            required
                        />
                    </label>
                    <label htmlFor="yearOperation">
                        <p className='font-medium mb-1'>Date </p>
                        <Input type="text" name="yearOperation" id="yearOperation" placeholder="Date " required />
                    </label>

                    <label htmlFor="OrderID">
                        <p className='font-medium mb-1'>Date </p>
                        <Input type="text" name="Order ID" id="Order ID" placeholder="Order ID" required />
                    </label>

                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button  size={'lg'}>Submit</Button>
                    </div>
                </form>
                <DialogClose ref={dialogCloseRef} />
            </DialogContent>
        </Dialog>

    )
}
