"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from "../../../../public/assets/logo.jpg";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function CustomerPaymentButton({ title, className, amount, size, quoteId, phase, disabled }: Readonly<{ title: string, className?: string, amount: number, size?: "default" | "sm" | "lg" | "icon" | null, quoteId: string, phase: string, disabled?: boolean }>) {
    const cookies = useCookies();
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    function loadScript(src: string): Promise<boolean> {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                setLoading(false);
                resolve(true);
            };
            script.onerror = () => {
                setLoading(false);
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        setLoading(true);
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies?.get('token')}`
            },
            body: JSON.stringify({ amount, quoteId, phase })
        });

        if (!response.ok) {
            alert("Server error. Are you online?");
            return;
        }

        const data = await response.json();

        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/profile`, {
            headers: {
                application: 'application/json',
                Authorization: `Bearer ${cookies?.get('token')}`
            },
        });
        const user = await userResponse.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: data.amount.toString(),
            currency: data.currency,
            name: "RenoSwift",
            description: "Test Transaction",
            image: { logo },
            order_id: data.id,
            handler: async function (response: any) {
                const body = {
                    orderCreationId: data.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    paymentId: data.paymentId,
                    amount: amount
                };

                const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/success${phase === "design" ? "?phase=design" : ""}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies?.get('token')}`
                    },
                    body: JSON.stringify(body)
                });

                const data_ = await result.json();

                if (result.ok) {
                    toast({
                        title: "Payment successful",
                    });
                    router.refresh();
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phoneNumber,
            },
            notes: {
                address: user.address,
            },
            theme: {
                color: "#facc15",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    /* async function initiatePayment() {
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
    } */

    return (
        <Button disabled={disabled || loading} size={size} className={cn(className)} onClick={displayRazorpay}>
            {loading && <AiOutlineLoading3Quarters className='animate-spin mr-2' />}
            {title}
        </Button>
    )
}
