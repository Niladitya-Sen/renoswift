"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useCookies } from "@/hooks/useCookies";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

type StatusType = {
    id: number;
    date: string;
    status: string;
    isCompleted: boolean;
};

export default function StatusTrackingDialog({ trigger, orderId, role }: Readonly<{ trigger: React.ReactNode, orderId: string, role: "customer" | "ot" | "admin" }>) {
    const [data, setData] = useState<StatusType[]>([]);
    const cookies = useCookies();

    useEffect(() => {
        async function getStatus() {
            let token: string | undefined;

            if (role === "ot") {
                token = cookies?.get('otToken');
            } else if (role === "admin") {
                token = cookies?.get('adminToken');
            } else {
                token = cookies?.get('token');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${role}/order/track-status/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                cache: 'no-store'
            });
            const data = await response.json();
            setData(data);
        }
        getStatus();
    }, [orderId]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Track Progress</DialogTitle>
                </DialogHeader>
                {
                    data.length === 0 ? (
                        <p className="text-gray-500">
                            Plan is not scheduled yet.
                        </p>
                    ) : (
                        <div className="mt-4 grid grid-cols-[1fr_0.3fr_1fr] gap-x-4 mx-auto max-h-[calc(100svh-10rem)] overflow-y-auto">
                            {
                                data.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <p className="font-medium justify-self-end">{dayjs(item.date).format("DD/MM/YYYY")}</p>
                                        <div className="flex flex-col items-center justify-center mx-auto h-[4rem]">
                                            <div className={cn("aspect-square w-4 h-5 rounded-full bg-green-500", {
                                                "bg-gray-300": !item.isCompleted
                                            })} />
                                            <div className={cn("h-full w-[2.5px] bg-green-500 rounded-full", {
                                                "bg-gray-300": !item.isCompleted,
                                                "invisible": index === data.length - 1
                                            })} />
                                        </div>
                                        <p>{item.status}</p>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
