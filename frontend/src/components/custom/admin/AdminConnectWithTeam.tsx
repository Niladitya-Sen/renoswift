import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export default function AdminConnectWithTeam({ trigger }: { trigger: React.ReactNode }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Connect With Team</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log('submitted');
                        setDialogOpen(false);
                    }}
                    onReset={() => {
                        setDialogOpen(false);
                    }}
                    >
                    <label htmlFor="message">
                        <p className='font-medium mb-1'>Message:</p>
                        <Textarea id="message" placeholder="Message" required rows={10} className={cn('bg-secondary')} />
                    </label>
                    <div className='mt-4 flex gap-4 w-full items-center justify-center'>
                        <Button type='reset' size={'lg'} variant={'outline'}>Cancel</Button>
                        <Button size={'lg'}>Send</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}
