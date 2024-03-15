"use client";

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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function AdminAddEmployeeDialog({ trigger }: Readonly<{ trigger: React.ReactNode }>) {
    const dialogCloseRef = React.useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const bodyContent = Object.fromEntries(new FormData(e.currentTarget).entries());
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/operations-team`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('adminToken')}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
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
                    description: "There was an error adding the user",
                });
            }
        } catch (err) {
            console.error(err);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: "There was an error adding the user",
            });
        } finally {
            dialogCloseRef.current?.click();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={cn('max-w-screen-lg')}>
                <DialogHeader>
                    <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>
                <form
                    className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'
                    onReset={() => {
                        dialogCloseRef.current?.click();
                    }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">
                        <p className='font-medium mb-1'>Name</p>
                        <Input type="text" id="name" name="name" placeholder="Name" required />
                    </label>
                    {/* <label htmlFor="employeeId">
                        <p className='font-medium mb-1'>Employee Id</p>
                        <Input type="text" id="employeeId" placeholder="Employee Id" required />
                    </label> */}
                    <label htmlFor="otRole">
                        <p className='font-medium mb-1'>Role</p>
                        <Input type="text" id="otRole" name="otRole" placeholder="Role" required />
                    </label>
                    <label htmlFor="email">
                        <p className='font-medium mb-1'>Email</p>
                        <Input type="email" id="email" name="email" placeholder="Email" inputMode='email' required />
                    </label>
                    <label htmlFor="phoneNumber">
                        <p className='font-medium mb-1'>Contact Number</p>
                        <Input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
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
                        <Textarea id="address" name="address" placeholder="Address" required rows={5} />
                    </label>
                    <div className='flex gap-4 items-center justify-center w-full col-span-full'>
                        <Button type='reset' size={'lg'} variant={"outline"}>Cancel</Button>
                        <Button size={'lg'}>Submit</Button>
                    </div>
                </form>
                <DialogClose ref={dialogCloseRef} />
            </DialogContent>
        </Dialog>

    )
}
