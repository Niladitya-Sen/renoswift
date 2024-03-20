"use client";

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function OperationsTeamGenerateOrderIdButton({ orderId }: { orderId: number }) {
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function generateOrderId() {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/generate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                },
                body: JSON.stringify({ orderId }),
                cache: 'no-store'
            });

            if (response.ok) {
                const data = await response.json();
                toast({
                    title: 'Success',
                    description: data.message
                });
                router.refresh();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'An error occurred while generating order ID'
                });
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while generating order ID'
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading} onClick={generateOrderId}>
            Generate Order ID
            {loading && <AiOutlineLoading3Quarters className="animate-spin ml-2" />}
        </Button>
    )
}
