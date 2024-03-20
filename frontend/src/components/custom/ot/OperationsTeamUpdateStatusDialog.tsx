"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Button } from "../../ui/button";
import { useCookies } from "@/hooks/useCookies";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function OperationsTeamUpdateStatusDialog({ trigger, orderId }: Readonly<{ trigger: React.ReactNode, orderId: string }>) {
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.currentTarget)));

        const formData = new FormData(e.currentTarget);
        formData.append('orderId', orderId);

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
                dialogCloseRef.current?.click();
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
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={cn('max-w-screen-md')}>
                <DialogHeader>
                    <DialogTitle>Update Status</DialogTitle>
                </DialogHeader>
                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 w-full">
                        <label htmlFor="currentStatus" className="w-full">
                            <p className='font-medium'>Current Status</p>
                            <Input type="text" id="currentStatus" name="currentStatus" className={cn('w-full border p-3 h-12 rounded-sm mt-1')} />
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
                            dialogCloseRef.current?.click();
                        }}>Cancel</Button>
                        <Button size={'lg'} type="submit">Update</Button>
                    </div>
                </form>
            </DialogContent>
            <DialogFooter>
                <DialogClose ref={dialogCloseRef} />
            </DialogFooter>
        </Dialog>
    )
}
