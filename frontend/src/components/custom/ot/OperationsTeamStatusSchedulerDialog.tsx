"use client";

import { Button } from "@/components/ui/button";
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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type StatusType = {
    date?: Date;
    status?: string;
}

export default function OperationsTeamStatusSchedulerDialog({ trigger, orderId }: Readonly<{ trigger: React.ReactNode, orderId: string }>) {
    const [data, setData] = useState<StatusType[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const cookies = useCookies();
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const router = useRouter();
    const [statusPresent, setStatusPresent] = useState(false);

    useEffect(() => {
        async function getStatus() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/track-status/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                },
                cache: 'no-store'
            });
            const data = await response.json();
            setData(data);
            if (data.length > 0) {
                setStatusPresent(true);
            }
        }
        getStatus();
    }, [dialogOpen]);

    function deleteStatus(index: number) {
        setData(data.filter((_, i) => i !== index));
    }

    function handleAddStatus(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newData: StatusType = Object.fromEntries(new FormData(e.currentTarget).entries());

        if (!newData.date || !newData.status) {
            toast({
                title: "Error",
                description: "Please fill all the fields",
                variant: "destructive"
            });
            return;
        }

        if (data.find(item => dayjs(item.date).isSame(dayjs(newData.date), 'day'))) {
            toast({
                title: "Error",
                description: "Status already added for this date",
                variant: "destructive"
            });
            return;
        }

        setData([...data, newData]);

        formRef.current?.reset();
    }

    async function handleSaveChanges() {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/schedule-status/${orderId}`, {
                method: statusPresent ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                },
                body: JSON.stringify({
                    status: data
                })
            });
            const result = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: result.message,
                });
                setDialogOpen(false);
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while saving the changes",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className={cn({
                "hidden": statusPresent
            })} asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Schedule Plan</DialogTitle>
                </DialogHeader>
                <div className="mt-4 p-2 grid grid-cols-[1fr_0.3fr_1fr] gap-x-4 mx-auto max-h-[calc(100svh-10rem)] overflow-y-auto">
                    {
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <p className="font-medium justify-self-end">{dayjs(item.date).format("DD/MM/YYYY")}</p>
                                <div className="flex flex-col items-center justify-center mx-auto h-[4rem]">
                                    <button className={cn("aspect-square block p-1 rounded-full bg-red-300")} onClick={() => {
                                        deleteStatus(index);
                                    }}>
                                        <span title="Delete">
                                            <MdDelete className="text-red-500 text-lg" />
                                        </span>
                                    </button>
                                    <div className={cn("h-full w-[2.5px] rounded-full bg-gray-300", {
                                        "invisible": index === data.length - 1
                                    })} />
                                </div>
                                <p>{item.status}</p>
                            </React.Fragment>
                        ))
                    }
                </div>
                <form ref={formRef} className="flex gap-4 items-center justify-center" onSubmit={handleAddStatus}>
                    <Input type="date" name="date" id="date" className={cn("w-full")} placeholder="Please select date" />
                    <Input type="text" name="status" id="status" className={cn("w-full")} placeholder="Please enter status" />
                    <Button variant={"secondary"} size={"sm"}>Add</Button>
                </form>
                <Button size="lg" disabled={loading} onClick={handleSaveChanges}>
                    Save Changes
                    {
                        loading && <AiOutlineLoading3Quarters className="animate-spin ml-2" />
                    }
                </Button>
            </DialogContent>
        </Dialog>

    )
}
