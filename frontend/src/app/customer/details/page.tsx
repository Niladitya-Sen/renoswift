import FileInput from '@/components/custom/FileInput';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import { AiFillInfoCircle } from "react-icons/ai";

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
    return (
        <>
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
                <label htmlFor="dimensions">
                    <p className='font-semibold'>*Dimensions</p>
                    <Input required type="text" id="dimensions" name="dimensions" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="budget">
                    <p className='font-semibold'>*Budget</p>
                    <Input required type="text" id="budget" name="budget" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="issues">
                    <p className='font-semibold'>*Functional Issues</p>
                    <Input required type="text" id="issues" name="issues" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="objective">
                    <p className='font-semibold'>*Objective for remodeling</p>
                    <Input required type="text" id="objective" name="objective" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="style">
                    <p className='font-semibold'>*Preferred style</p>
                    <Input required type="text" id="style" name="style" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="timeline">
                    <p className='font-semibold'>*Timeline</p>
                    <Input required type="text" id="timeline" name="timeline" className='w-full border p-2 rounded-sm mt-1' />
                </label>
                <label htmlFor="specialRequest" className='col-span-2'>
                    <p className='font-semibold'>*Special Request</p>
                    <Input required type="text" id="specialRequest" name="specialRequest" className='w-full border p-2 rounded-sm mt-1' />
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
        </>
    )
}
