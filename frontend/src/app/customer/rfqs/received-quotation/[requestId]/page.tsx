"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { IoArrowBack } from "react-icons/io5"
import PopupComponent from '@/components/custom/customer/Popup'


export default function ReceivedQuotationDetails({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    const formData: Record<string, string> = {}
    const [isPaid, setIsPaid] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Function to handle the payment action
    const handlePayment = () => {
        // Logic to handle the payment process
        // Once the payment is successful, set isPaid to true to remove the blur effect
        setIsPaid(true);
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    // Apply blur effect based on payment state
    const blurStyle = isPaid ? {} : { filter: 'blur(5px)' };

    return (
        <div>
            <Link href={"/customer/rfqs/received-quotation"} className={cn('block ml-auto w-fit')}>
                <Button variant={"link"}>
                    <IoArrowBack className='mr-2 text-lg' />
                    <span title='back'>BACK</span>
                </Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary text-primary-foreground')}>
                    <TableRow>
                        <TableHead className={cn('text-primary-foreground')}>Request ID</TableHead>
                        <TableHead className={cn('text-primary-foreground')}>Date of Response</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{requestId}</TableCell>
                        <TableCell>15/02/24</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {!isPaid && (
                <div className='flex justify-end my-10 mr-5'>
                    <div className="bg-yellow-200 p-3 rounded-lg text-yellow-900" style={{ maxWidth: '300px' }}> {/* Adjust maxWidth as needed for the rectangle size */}
                        <p>
                            Unlock the design with a <br /> payment of ₹2000
                        </p>
                        <Button onClick={handlePayment} className="mt-2">Pay Now</Button>
                    </div>
                </div>
            )}
            <div className='flex flex-col sm:grid sm:grid-cols-2 my-10 gap-4 px-5'>
                <label htmlFor="designPlan">
                    <p className='font-semibold' style={blurStyle}>Remodeling Design Plan</p>
                    <div className={'w-full border rounded-sm mt-1 flex items-center justify-between ${blurClass}'}>
                        <Input readOnly type="text" id="designPlan" name="designPlan" className={cn('border-0')} style={blurStyle} />

                    </div>
                </label>
                <label htmlFor="designPlanLink">
                    <p className='font-semibold' style={blurStyle}>Remodeling Design Plan</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="designPlan" name="designPlan" className={cn('border-0')} style={blurStyle} />

                    </div>
                </label>



                <label htmlFor="quotation">
                    <p className='font-semibold'>Quotation</p>
                    <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                        <Input readOnly type="text" id="quotation" name="quotation" className={cn('border-0')} />
                    </div>
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>Delivery Timeline</p>
                    <Input readOnly type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' value={formData?.timeline} />
                </label>
                <label htmlFor="teamRemarks" className="col-span-full">
                    <p className='font-semibold'>Remarks From Team</p>
                    <Input readOnly type="text" id="teamRemarks" name="teamRemarks" className='w-full border p-2 rounded-sm mt-1' value={formData?.teamRemarks} />
                </label>
            </div>
            <div className='flex gap-4 items-center justify-center w-full col-span-full mt-2 mb-4'>
                <Button variant={'outline'} onClick={togglePopup} className={cn('border-2 border-primary text-primary hover:text-primary')}>
                    CONNECT WITH TEAM
                </Button>
                {isPaid && (

                    <Button onClick={() => {/* handle confirm and pay logic */ }} className={cn('w-[180px]')}>
                        CONFIRM ORDER & PAY
                    </Button>

                )}
            </div>
            <PopupComponent isVisible={isPopupVisible} togglePopup={togglePopup} sendMessage={() => {/* handle send message */ }} />
        </div>
    );
};

