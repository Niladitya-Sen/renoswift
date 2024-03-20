"use client";

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function CustomerPaymentButton({ title, className, amount, size, quoteId, phase, disabled }: { title: string, className?: string, amount: number, size?: "default" | "sm" | "lg" | "icon" | null, quoteId: string, phase: string, disabled?: boolean }) {
    const cookies = useCookies();
    const router = useRouter();
    const { toast } = useToast();

    async function initiatePayment() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/initiate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('token')}`
                },
                body: JSON.stringify({ amount, quoteId, phase })
            });
            const data = await response.json();

            if (response.ok) {
                router.push(`/pay?pid=${data.paymentId}`);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to initiate payment",
                variant: "destructive",
            });
            console.error(error);
        }
    }

    return (
        <Button disabled={disabled} size={size} className={cn(className)} onClick={initiatePayment}>
            {title}
        </Button>
    )
}
