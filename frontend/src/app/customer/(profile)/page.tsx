"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useCookies } from '@/hooks/useCookies';
import { useToast } from '@/components/ui/use-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProfileLoading from './loading';

type UserType = {
    name: string;
    email: string;
    phoneNumber: string;
    imageURL: string;
    address: string;
    image: File | undefined;
}

export default function ProfileDetails() {
    const [user, setUser] = useState<UserType>({
        name: '',
        email: '',
        phoneNumber: '',
        imageURL: '',
        address: '',
        image: undefined
    });
    const cookies = useCookies();
    const [readOnly, setReadOnly] = useState(true);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/profile`, {
                    headers: {
                        application: 'application/json',
                        Authorization: `Bearer ${cookies?.get('token')}`
                    },
                });
                const data = await response.json();
                console.log(data);
                setUser(data);
                setIsPageLoading(false);
            } catch (err) {
                console.log(err);
                setIsPageLoading(false);
            }
        }
        getProfile();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (readOnly) {
            setReadOnly(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/profile`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${cookies?.get('token')}`
                },
                body: new FormData(e.currentTarget)
            });
            const data = await response.json();
            toast({
                description: data.message,
            })
            setReadOnly(true);
            setLoading(false);
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Could not update profile. Please try again later.'
            });
            setLoading(false);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].size > 1024 * 1024 * 5) {
                toast({
                    variant: 'destructive',
                    description: 'File size should be less than 5MB'
                });
                return;
            }

            setUser({ ...user, image: e.target.files[0] });
        }
    }

    if (isPageLoading) {
        return <ProfileLoading />
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={cn('absolute inset-0 bg-black/80 z-50 cursor-wait', {
                'hidden': !loading,
                'grid place-content-center': loading
            })}>
                <AiOutlineLoading3Quarters className='animate-spin text-5xl text-primary' />
            </div>
            <label htmlFor='imageURL' className='block w-[200px] h-[200px] relative rounded-lg overflow-hidden'>
                <Image src={user.image ? URL.createObjectURL(user.image) : process.env.NEXT_PUBLIC_API_URL + user.imageURL} alt='placeholder' width={500} height={500} className='w-full h-full object-cover object-center' />
                <input disabled={readOnly} type="file" name="imageURL" id="imageURL" onChange={handleImageChange} className='invisible absolute' />
            </label>
            <div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 my-10 gap-4'>
                <label htmlFor="name">
                    <p className='font-semibold'>Full Name</p>
                    <Input
                        readOnly={readOnly}
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        placeholder="Full Name"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                        required
                    />
                </label>
                <label htmlFor="email">
                    <p className='font-semibold'>Email ID</p>
                    <Input
                        readOnly={readOnly}
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email ID"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                        required
                    />
                </label>
                <label htmlFor="phoneNumber">
                    <p className='font-semibold'>Mobile Number</p>
                    <Input
                        readOnly={readOnly}
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                        placeholder="Mobile Number"
                        className={cn('w-full border p-2 rounded-sm mt-1')}
                        minLength={10}
                        maxLength={10}
                        pattern='[0-9]{10}'
                        required
                    />
                </label>
                <label htmlFor="address" className='col-span-2'>
                    <p className='font-semibold'>Address</p>
                    <Textarea
                        readOnly={readOnly}
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                        placeholder="Address"
                        className='border p-2 rounded-sm mt-1 min-h-[6rem] w-full'
                        rows={4}
                    />
                </label>
                <div className='flex gap-4 items-center justify-center w-full col-span-full mt-4'>
                    <Button variant={'destructive'} size={'lg'}>
                        Delete Account
                    </Button>
                    <Button size={'lg'}>
                        {
                            readOnly ? 'Edit' : 'Save Changes'
                        }
                    </Button>
                </div>
            </div>
        </form>
    )
}
