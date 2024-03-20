"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { useRouter } from 'next/navigation';
import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';

export default function AdminDeleteUserButton({ type, id }: Readonly<{ type: "customers" | "operations-team", id: string | number }>) {
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    async function deleteUserById() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${cookies?.get('adminToken')}`
            }
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
                title: 'Error',
                description: "There was an error deleting the user",
            });
        }
    }

    return (
        <Button
            variant={'ghost'}
            size={'icon'}
            onClick={deleteUserById}
        >
            <RiDeleteBinLine className='text-red-500 text-xl' />
        </Button>
    )
}
