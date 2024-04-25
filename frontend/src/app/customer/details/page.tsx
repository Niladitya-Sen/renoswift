"use client";

import CustomerDetailsForm from '@/components/custom/CustomerDetailsForm';
import FileInput from '@/components/custom/FileInput';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { AiFillInfoCircle } from "react-icons/ai";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IoCloseOutline } from "react-icons/io5";
import { FaEquals } from "react-icons/fa6";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from "lucide-react"
import { buttonVariants } from '@/components/ui/button';

const brands = [
    {
        id: 1,
        value: 'Jaquar',
    },
    {
        id: 2,
        value: 'Hindware',
    },
    {
        id: 3,
        value: 'Parryware',
    },
    {
        id: 4,
        value: 'Kohler',
    },
    {
        id: 5,
        value: 'Roca',
    },
    {
        id: 6,
        value: 'Oyster Bath',
    },
];

export default function Details() {
    const [dimensions, setDimensions] = useState<{ length: number; breadth: number; height: number; }>({
        length: 0,
        breadth: 0,
        height: 0,
    });
    const dimensionValue = dimensions?.length * dimensions?.breadth * dimensions?.height;
    const [date, setDate] = useState<Date | undefined>();

    return (
        <CustomerDetailsForm>
            <div className='grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-5 gap-y-4 gap-x-2'>
                <div className='col-span-full flex items-center justify-between'>
                    <p className='font-semibold text-lg'>* Add Photos (min 5)</p>
                    <div className='flex items-center gap-2'>
                        <AiFillInfoCircle className='text-blue-600 text-xl' />
                        <p className='font-semibold'>Fields marked * are mandatory.</p>
                    </div>
                </div>
                <FileInput name="image1" id="1" accept='image/*' />
                <FileInput name="image2" id="2" accept='image/*' />
                <FileInput name="image3" id="3" accept='image/*' />
                <FileInput name="image4" id="4" accept='image/*' />
                <FileInput name="image5" id="5" accept='image/*' />
                <div className='col-span-full w-full'></div>
                <FileInput name="video" id="video" title='*Add Video' accept='video/*' />
                <FileInput name="floorplan" id="floorplan" title='Add Floorplan' accept='image/*' />
            </div>
            <div className='flex flex-col sm:grid sm:grid-cols-3 mt-20 gap-4'>
                <label htmlFor="area">
                    <p className='font-semibold'>*Dimensions (L &#x2715; B &#x2715; H)</p>
                    <div className="grid gap-2 grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] place-items-center">
                        <Input
                            required
                            type="text"
                            id="length"
                            name="length"
                            value={dimensions.length}
                            onChange={(e) => {
                                const val = e.currentTarget.value;

                                if (isNaN(Number(val))) return;

                                setDimensions({
                                    ...dimensions,
                                    length: Number(val)
                                });
                            }}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <IoCloseOutline className='text-xl' />
                        <Input
                            required
                            type="text"
                            id="breadth"
                            name="breadth"
                            value={dimensions.breadth}
                            onChange={(e) => {
                                const val = e.currentTarget.value;

                                if (isNaN(Number(val))) return;

                                setDimensions({
                                    ...dimensions,
                                    breadth: Number(val)
                                });
                            }}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <IoCloseOutline className='text-xl' />
                        <Input
                            required
                            type="text"
                            id="height"
                            name="height"
                            value={dimensions.height}
                            onChange={(e) => {
                                const val = e.currentTarget.value;

                                if (isNaN(Number(val))) return;

                                setDimensions({
                                    ...dimensions,
                                    height: Number(val)
                                });
                            }}
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                        <FaEquals className='text-xl' />
                        <Input
                            required
                            readOnly
                            value={dimensionValue}
                            type="text"
                            id="area"
                            name="area"
                            className='w-full border p-2 rounded-sm mt-1'
                        />
                    </div>
                </label>
                <label htmlFor="budget">
                    <p className='font-semibold'>*Budget</p>
                    <Input required type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="issues">
                    <p className='font-semibold'>*Functional Issues</p>
                    <Input required type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="doors">
                    <p className='font-semibold'>*Number of doors</p>
                    <Input required type="text" id="doors" name="doors" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="windows">
                    <p className='font-semibold'>*Number of windows</p>
                    <Input required type="text" id="windows" name="windows" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="objective">
                    <p className='font-semibold'>*Objective for remodeling</p>
                    {/* <Input required type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' /> */}
                    <Select name='objective'>
                        <SelectTrigger className={cn('w-full border p-2 rounded-sm mt-1')}>
                            <SelectValue placeholder="Objective for remodeling" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Seapage Issues">Seapage Issues</SelectItem>
                            <SelectItem value="Modern Look">Modern Look</SelectItem>
                            <SelectItem value="Space Enhancement">Space Enhancement</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>

                </label>
                <label htmlFor="style">
                    <p className='font-semibold'>*Preferred Theme</p>
                    <Input required type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>*Expected Start Date</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: 'outline'
                                    }),
                                    "gap-2 w-full mt-1"
                                )}
                            >
                                <CalendarIcon className='w-4 h-4' />
                                <input
                                    required
                                    readOnly
                                    value={date ? dayjs(date).format("DD/MM/YYYY") : "Pick a date"}
                                    type="text"
                                    id="timeline"
                                    name="timeline"
                                    className={cn('w-full border-0 outline-0 bg-transparent')}
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className={cn('w-auto p-0')}>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </label>
                <label htmlFor="specialRequest" className='col-span-2'>
                    <p className='font-semibold'>Special Request</p>
                    <Input type="text" id="specialRequest" name="specialRequest" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="brand" className='col-span-full flex flex-col gap-4 items-start w-full'>
                    <p className='font-semibold text-lg'>Pick From Our Pool Of Brands</p>
                    {
                        brands.map(brand => (
                            <div key={brand.id} className='flex gap-2 items-center justify-center text-nowrap'>
                                <Input type='checkbox' name={'brand' + brand.id} id={'brand' + brand.id} className={cn('w-4 h-4 accent-primary')} value={brand.value} />
                                <p>{brand.value}</p>
                            </div>
                        ))
                    }
                </label>
            </div>
        </CustomerDetailsForm>
    )
}
