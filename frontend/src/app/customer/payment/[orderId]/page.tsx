"use client";

import React, { useState } from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import PopupComponent from '@/components/custom/customer/Popup'


const payments = [
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/02/24',
        status: 'Paid'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '21/02/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/02/24',
        status: 'Paid'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '21/02/24',
        status: 'Pending'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Dismanlting',
        amount: 20000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Piping',
        amount: 15000,
        dueDate: '26/04/24',
        status: 'Upcoming'
    },
    {
        phase: 'Finishing',
        amount: 246300,
        dueDate: '26/04/24',
        status: ('Upcoming')
    },
    
];

function PaymentTableRow({ phase, amount, dueDate, status }: { phase: string, amount: number, dueDate: string, status: string }) {
   

    return (
        <TableRow>
            <TableCell>{phase}</TableCell>
            <TableCell>&#8377;{amount}</TableCell>
            <TableCell>{dueDate}</TableCell>
            <TableCell>{status}</TableCell>
        </TableRow>
    )
}

export default function PaymentDetailsCS({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const totalAmount: number = payments.reduce((acc, payment) => acc + payment.amount, 0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <>
            <Link href={"/customer/payment"} className={cn('ml-auto block w-fit mb-4')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
                    <span title='back'>BACK</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Order ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Amount Paid</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Amount Due</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Final Due Date</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Payment Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">ORD786856</TableCell>
                        <TableCell>&#8377;51,677</TableCell>
                        <TableCell>&#8377;1,71,704</TableCell>
                        <TableCell>21/04/24</TableCell>
                        <TableCell>Visa Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="max-w-screen-lg mx-auto mt-10">
                <Table>
                    <TableHeader className={cn('bg-primary')}>
                        <TableRow>
                            <TableHead className={cn('text-primary-foreground')}>Phase</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Amount</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Due Date</TableHead>
                            <TableHead className={cn('text-primary-foreground')}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment, index) => (
                            <PaymentTableRow key={index} {...payment} />
                        ))}
                        <TableRow className="bg-gray-200">
                            <TableCell colSpan={2} className="font-semibold">Total:</TableCell>
                            <TableCell className="font-semibold">&#8377;{totalAmount.toLocaleString()}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='flex gap-4 items-center justify-center w-full col-span-full mt-4 mb-8'> 
                <Button variant={'outline'} onClick={togglePopup} className={cn('border-2 border-primary text-primary hover:text-primary')}>
        CONNECT WITH TEAM
    </Button>
    <Button className={cn('w-[160px]')}>PAY NOW</Button>
</div>
<PopupComponent isVisible={isPopupVisible} togglePopup={togglePopup} sendMessage={() => {/* handle send message */}} />

                
            </div>
        </>
    )
}
