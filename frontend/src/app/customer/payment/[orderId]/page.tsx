"use client";

import React, { useEffect, useState } from 'react';
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
import { useCookies } from '@/hooks/useCookies';
import dayjs from 'dayjs';

type PaymentType = {
    orderId: string;
    amountPaid: number;
    amountDue: number;
    finalDueDate: string;
    paymentMethod: string;
    payments: {
        phase: string;
        amount: number;
        dueDate: string;
        status: string;
    }[];
}

function PaymentTableRow({ phase, amount, dueDate, status }: Readonly<{ phase: string, amount: number, dueDate: string, status: string }>) {
    return (
        <TableRow>
            <TableCell>{phase.charAt(0).toUpperCase() + phase.slice(1)}</TableCell>
            <TableCell>{amount.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR'
            })}</TableCell>
            <TableCell>{dayjs(dueDate).format("DD/MM/YYYY")}</TableCell>
            <TableCell>{status === "done" ? "Paid" : "Pending"}</TableCell>
        </TableRow>
    )
}

export default function PaymentDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const cookies = useCookies();
    const [payment, setPayment] = useState<PaymentType>();
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
        async function getPayments() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/${orderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('token')}`
                }
            });
            const data: PaymentType = await response.json();
            setPayment(data);
            setTotalAmount(data.payments.reduce((acc, curr) => acc + curr.amount, 0));
        }
        getPayments();
    }, [orderId])

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
                        <TableCell className="font-medium">{payment?.orderId}</TableCell>
                        <TableCell>{payment?.amountPaid?.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        })}</TableCell>
                        <TableCell>{payment?.amountDue?.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR'
                        })}</TableCell>
                        <TableCell>{dayjs(payment?.finalDueDate).format("DD/MM/YYYY")}</TableCell>
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
                        {payment?.payments.map((payment, index) => (
                            <PaymentTableRow key={index} {...payment} />
                        ))}
                        <TableRow className="bg-gray-200">
                            <TableCell className="font-semibold">Total:</TableCell>
                            <TableCell colSpan={3} className="font-semibold">{totalAmount.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            })}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='flex gap-4 items-center justify-center w-full col-span-full mt-4 mb-8'>
                    <Button variant={'outline'} onClick={togglePopup} className={cn('border-2 border-primary text-primary hover:text-primary')}>
                        CONNECT WITH TEAM
                    </Button>
                    <Button className={cn('w-[160px]')}>PAY NOW</Button>
                </div>
                <PopupComponent isVisible={isPopupVisible} togglePopup={togglePopup} sendMessage={() => {/* handle send message */ }} />
            </div>
        </>
    )
}
