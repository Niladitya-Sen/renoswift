"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function CustomerReviewDialog() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getReview() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/review/${params.orderId}`, {
                headers: {
                    'Authorization': `Bearer ${cookies?.get('token')}`
                }
            });
            const data = await response.json();

            if (data.rating)
                setRating(data.rating);

            if (data.feedback)
                setComment(data.feedback);
        }
        if (open) {
            getReview();
        }
    }, [open]);

    useEffect(() => {
        document.querySelectorAll('.star').forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('fill-none', 'stroke-[3rem]');
                star.classList.add('fill-primary', 'stroke-none');
            } else {
                star.classList.remove('fill-primary', 'stroke-none');
                star.classList.add('fill-none', 'stroke-[3rem]');
            }
        });
    }, [rating]);

    async function saveReview() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies?.get('token')}`
            },
            body: JSON.stringify({ rating, comment, orderId: params.orderId })
        });
        const data = await response.json();

        if (response.ok) {
            toast({
                description: data.message,
            });
            router.refresh();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={cn("mx-auto")}>
                    Review Us
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rate your experience</DialogTitle>
                </DialogHeader>
                <div className='flex gap-2'>
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index} className='star text-xl cursor-pointer fill-none stroke-[3rem]' onClick={() => setRating(index + 1)} />
                        ))
                    }
                </div>
                <p className='font-semibold'>Leave a comment below. Your feedback helps us improve!</p>
                <Textarea value={comment} onChange={(e) => setComment(e.currentTarget.value)} placeholder='Add your comments...' rows={5} />
                <div className='flex gap-4 ml-auto'>
                    <Button variant={"secondary"}>Cancel</Button>
                    <Button onClick={saveReview}>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}
