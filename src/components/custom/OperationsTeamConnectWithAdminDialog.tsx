"use client";

import { useNotification } from "@/app/ot/notifications/[type]/page";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export default function OperationsTeamConnectWithAdminDialog() {
    const notification = useNotification();

    return (
        <Dialog open={notification.dialogOpen} onOpenChange={notification.setDialogOpen}>
            <DialogContent className={cn('max-h-[calc(100svh-5rem)] h-full flex flex-col')}>
                <DialogHeader>
                    <DialogTitle>Connect With Admin</DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col gap-4 max-h-[100svh-10rem] h-fulloverflow-y-auto">
                    <div className={cn("bg-primary text-primary-foreground w-fit max-w-[75%] rounded-lg p-4 self-end")}>
                        Hello
                    </div>
                    <div className={cn("bg-secondary text-secondary-foreground w-fit max-w-[75%] rounded-lg p-4")}>
                        Yes how can I help you?
                    </div>
                </div>
                <form className="flex gap-4 items-center justify-center">
                    <Input type="text" className={cn('w-full h-12')} placeholder="Write a message" />
                    <Button className={cn('px-4 py-4 h-12')}>
                        <Send />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
