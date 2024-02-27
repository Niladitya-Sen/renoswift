"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { Button } from "../../ui/button";

export default function OperationsTeamUpdateStatusDialog({ open, onOpenChange }: Readonly<{ open: boolean, onOpenChange: (open: boolean) => void }>) {
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('form submitted');
        dialogCloseRef.current?.click();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
