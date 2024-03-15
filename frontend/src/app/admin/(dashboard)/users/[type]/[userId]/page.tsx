"use client";

import AdminConnectWithTeam from '@/components/custom/admin/AdminConnectWithTeam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type UserType = {
    id: number;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    isActive: boolean;
};


export default function UserDetails({ params: { type, userId } }: Readonly<{ params: { type: string, userId: string } }>) {
    const [readOnly, setReadOnly] = useState(true);
    const cookies = useCookies();
    const [user, setUser] = useState<UserType>();
    const { toast } = useToast();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    if (type === 'customers') {
        notFound();
    }

    useEffect(() => {
        async function getUsersDetail() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${type}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('adminToken')}`
                }
            });
            const data = await response.json();
            setUser(data);
        }
        getUsersDetail();
    }, [userId, type]);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const bodyContent = Object.fromEntries(new FormData(e.currentTarget).entries());
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${type}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('adminToken')}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(bodyContent)
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                });
                router.refresh();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: "There was an error updating the Operation team member",
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: "There was an error updating the Operation team member",
            });
        }
    }

    async function deleteUser() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${type}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('adminToken')}`,
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                });
                router.push(`/admin/users/${type}`);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: "There was an error deleting the Operation team member",
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: "There was an error deleting the Operation team member",
            });
        }
    }

    return (
        <div className='relative'>
            <Link href={`/admin/users/${type}`} className={cn('absolute -top-16 right-2 block')}>
                <Button size={'sm'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit')}>Back</Button>
            </Link>
            <Table>
                <TableHeader className={cn('bg-primary')}>
                    <TableRow>
                        <TableHead className={cn('text-white')}>Customer ID</TableHead>
                        <TableHead className={cn('text-white')}>Name</TableHead>
                        <TableHead className={cn('text-white')}>Email</TableHead>
                        <TableHead className={cn('text-white')}>Contact Number</TableHead>
                        <TableHead className={cn('text-white')}>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">{user?.id}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.isActive ? 'Active' : 'Inactive'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <form ref={formRef} className='grid grid-cols-2 gap-4 max-w-screen-md mt-8' onSubmit={handleSubmit}>
                <label htmlFor="email">
                    <p className='font-medium mb-1'>Email</p>
                    <Input readOnly={readOnly} defaultValue={user?.email} type="email" name="email" id="email" placeholder="Email" inputMode='email' required />
                </label>
                <label htmlFor="phoneNumber">
                    <p className='font-medium mb-1'>Contact Number</p>
                    <Input
                        readOnly={readOnly}
                        type="text"
                        id="phoneNumber"
                        name='phoneNumber'
                        defaultValue={user?.phoneNumber}
                        placeholder="Contact Number"
                        minLength={10}
                        maxLength={10}
                        pattern='[0-9]{10}'
                        inputMode='numeric'
                        required
                    />
                </label>
                <label htmlFor="address" className='col-span-full'>
                    <p className='font-medium mb-1'>Address</p>
                    <Textarea readOnly={readOnly} defaultValue={user?.address} name="address" id="address" placeholder="Address" required rows={5} />
                </label>
            </form>

            <AdminConnectWithTeam
                trigger={
                    <Button size={'lg'} variant={'outline'} className={cn('border-primary text-primary hover:text-primary w-fit my-4')}>Connect</Button>
                }
            />

            <div className='flex w-full gap-4 items-center justify-center'>
                <Button size={'lg'} variant={'destructive'} onClick={deleteUser}>Delete Account</Button>
                <Button size={'lg'} onClick={() => {
                    setReadOnly(!readOnly);
                    if (!readOnly) {
                        formRef.current?.requestSubmit();
                    }
                }}>
                    {
                        readOnly ? 'Edit' : 'Save'
                    }
                </Button>
            </div>
        </div>
    )
}
