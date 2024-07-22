"use client"
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
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

export default function PaymentUpdateDialog({ userId, trigger, orderId, amountDue, amountPaid, DueDate, quoteId }: { trigger: React.ReactNode, orderId: string, quoteId: string, userId: number, amountDue: number, amountPaid: number, DueDate: string }) {
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    const [newAmountPaid, setNewAmountPaid] = useState(amountPaid);
    const [newAmountDue, setNewAmountDue] = useState(amountDue);

    const formatDueDate = (date: string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day} 00:00:00`; // Ensuring format is 'YYYY-MM-DD HH:MM:SS'
    }

    const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const paidAmount = parseFloat(e.target.value) || 0;
        const dueAmount = amountDue - paidAmount;
        setNewAmountPaid(paidAmount);
        setNewAmountDue(dueAmount);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const data = {
            ...Object.fromEntries(formData.entries()),
            userId, // Adding userId to the request body
            amountDue: newAmountDue,
            amountPaid: newAmountPaid,
            finalDueDate: formatDueDate(DueDate) // Ensuring finalDueDate is passed
        };

        console.log('Submitting data:', data); // Logging data to check before sending to API

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/payment/update-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            toast({
                description: 'Payment successful!',
            });
            router.push('/ot/payments');
        } catch (error) {
            toast({
                description: 'Payment Unsuccessful!',
                variant: 'destructive'
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn('max-w-screen-lg')}>
                <DialogHeader>
                    <DialogTitle>Update Payment</DialogTitle>
                </DialogHeader>
                <form
                    className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'
                    onReset={() => {
                        dialogCloseRef.current?.click();
                    }}
                    onSubmit={handleSubmit}
                >
                    <label>
                        <p className='font-medium mb-1'>Order ID</p>
                        <Input type="text" id="orderId" placeholder="Order ID" defaultValue={orderId} required />
                    </label>
                    <label htmlFor="quoteId">
                        <p className='font-medium mb-1'>Reference ID </p>
                        <Input type="text" name="quoteId" id="quoteId" placeholder="Reference ID " defaultValue={quoteId} required />
                    </label>
                    <label htmlFor="">
                        <p className='font-medium mb-1'>Total Paid</p>
                        <Input type="number" name="" id="" placeholder="Total Paid" defaultValue={amountPaid}  required />
                    </label>
                  
                    <label htmlFor="amountDue">
                        <p className='font-medium mb-1'>Amount Due</p>
                        <Input type="text" name="amountDue" id="amountDue" placeholder="Amount Due" value={newAmountDue} readOnly required />
                    </label>
                    <label htmlFor="amountPaid">
                        <p className='font-medium mb-1'>Amount Paid</p>
                        <Input type="number" name="amountPaid" id="amountPaid" placeholder="Total Paid"  onChange={handleAmountPaidChange} required />
                    </label>
                    <label htmlFor="method">
                        <p className='font-medium mb-1'>Mode of Payment</p>
                        <Input type="text" name="method" id="method" placeholder="Mode of payment" required />
                    </label>
                
                    <label htmlFor="dueDate">
                        <p className='font-medium mb-1'>Due Date</p>
                        <Input type="text" name="dueDate" id="dueDate" placeholder="Due Date" defaultValue={formatDueDate(DueDate)} readOnly required />
                    </label>
                    <label htmlFor="receipt">
                        <p className='font-medium mb-1'>Transaction Number</p>
                        <Input type="text" name="receipt" id="receipt" placeholder="Transaction Number" required />
                    </label>

                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button type='submit' size={'lg'}>Submit</Button>
                    </div>
                </form>
                <DialogClose ref={dialogCloseRef} />
            </DialogContent>
        </Dialog>
    );
}
