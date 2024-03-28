"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCookies } from "@/hooks/useCookies";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export default function OperationsTeamUpdateStatusDialog({ trigger, orderId }: Readonly<{ trigger: React.ReactNode, orderId: string }>) {
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [status, setStatus] = useState<{ status: string, statusId: number }>();

    useEffect(() => {
        async function getLatestIncompleteStatus() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/latest-incomplete-status/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                }
            });
            const data = await response.json();
            setStatus(data);
        }

        if (dialogOpen) {
            getLatestIncompleteStatus();
        }
    }, [dialogOpen, orderId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append('orderId', orderId);
        formData.append('statusId', status?.statusId + "");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/update-status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookies?.get('otToken')}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                });
                setDialogOpen(false);
                router.refresh();
            } else {
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error(error);

            toast({
                title: 'Error',
                description: 'An error occurred while updating status',
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={cn('max-w-screen-md')}>
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>
                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 w-full">
                        <label htmlFor="currentStatus" className="w-full">
                            <p className='font-medium'>Current Status</p>
                            <Input type="text" id="currentStatus" name="currentStatus" className={cn('w-full border p-3 h-12 rounded-sm mt-1')} value={status?.status} />
                        </label>
                        <label htmlFor="image" className="w-full">
                            <p className='font-semibold'>Updated Photos</p>
                            <div className='w-full border rounded-sm mt-1 flex items-center justify-between'>
                                <Input type="file" accept='image/*' id="image" name="image" className={cn('border-0')} />
                                <label htmlFor="image" className="m-1 text-sm border border-blue-500 text-blue-500 rounded-sm px-4 py-2 hover:bg-secondary transition-colors duration-200">
                                    Upload
                                </label>
                            </div>
                        </label>
                    </div>
                    <label htmlFor="remarks" className="block">
                        <p className='font-medium'>Remarks</p>
                        <textarea id="remarks" name="remarks" className='w-full border p-3 rounded-sm mt-1 min-h-[6rem]' />
                    </label>
                    <div className="flex items-center justify-center gap-4">
                        <Button type="reset" size={'lg'} variant={'outline'} onClick={() => {
                            setDialogOpen(false);
                        }}>Cancel</Button>
                        <Button size={'lg'} type="submit">Update</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
