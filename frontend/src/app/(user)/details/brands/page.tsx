import Image from 'next/image'
import React from 'react'
import { FaCheck } from "react-icons/fa6";

export default function Brands() {
    const brands = [
        {
            id: 1,
            value: 'Oyster',
        },
        {
            id: 2,
            value: 'Jaquar',
        },
        {
            id: 3,
            value: 'Cera',
        },
        {
            id: 4,
            value: 'Hindware',
        },
        {
            id: 5,
            value: 'Parryware',
        },
        {
            id: 6,
            value: 'Johnson Bathrooms',
        },
        {
            id: 7,
            value: 'Kohler',
        },
        {
            id: 8,
            value: 'Grohe',
        },
        {
            id: 9,
            value: 'Toto',
        },
        {
            id: 10,
            value: 'Duravit',
        },
        {
            id: 11,
            value: 'Roca',
        }
    ];

    return (
        <div className='grid grid-cols-3 gap-8 place-content-center place-brand.ids-center max-w-screen-lg mx-auto'>
            {
                brands.map(brand => (
                    <label
                        key={brand.id}
                        htmlFor={"brand" + brand.id}
                        className='block relative bg-black rounded-sm overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer'
                    >
                        <input type="radio" name="brand" id={"brand" + brand.id} className='peer invisible w-full h-full absolute inset-0 z-20' value={brand.value} />
                        <Image
                            key={brand.id}
                            src={`/assets/brands/brand${brand.id}.png`}
                            alt='brand'
                            width={500}
                            height={500}
                            className='w-full h-full object-cover object-center cursor-pointer'
                        />
                        <div className='absolute inset-0 bg-primary/20 border-4 border-primary rounded-md hidden peer-checked:block'>
                            <div className='flex items-center justify-center w-full h-full'>
                                <FaCheck className='text-primary text-6xl' />
                            </div>
                        </div>
                    </label>
                ))
            }
        </div>
    )
}
