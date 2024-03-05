"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

export default function ProfileDetails() {
    // State to manage field values
    const [name, setName] = useState('Rahul Sharma');
    const [email, setEmail] = useState('rahul_sharma@gmail.com');
    const [number, setNumber] = useState('9854126302');
    const [address, setAddress] = useState('House no - 1108, Tower B, Galaxy Apartment, Sector -21, M.G. Road, Andheri West, Mumbai, Maharastra, India, 400053');

    return (
        <form>
            <div className='mt-10'>
                <Image src='/assets/defaultImage.png' alt='placeholder' width={200} height={200} />
            </div>
            <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 my-10 gap-4'>
                <label htmlFor="name">
                    <p className='font-semibold'>Full Name</p>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                    />
                </label>
                <label htmlFor="email">
                    <p className='font-semibold'>Email ID</p>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                    />
                </label>
                <label htmlFor="number">
                    <p className='font-semibold'>Mobile Number</p>
                    <Input
                        type="text"
                        id="number"
                        name="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Mobile Number"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                    />
                </label>
                <label htmlFor="address" className='col-span-2'>
                    <p className='font-semibold'>Address</p>
                    <Textarea
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className='border p-2 rounded-sm mt-1 min-h-[6rem] w-full'
                        rows={4}
                    />
                </label>
                <div className='flex gap-4 items-center justify-center w-full col-span-full mt-4'>
                    <Button variant={'destructive'} size={'lg'}>
                        Delete Account
                    </Button>
                    <Button size={'lg'}>Edit</Button>
                </div>
            </div>
        </form>
    )
}
