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
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";


type StatusType = {
    id: number;
    date: string;
    status: string;
    isCompleted: boolean;
    imageURL: string;
};


export default function StatusTrackingDialog({ trigger, orderId, role }: Readonly<{ trigger: React.ReactNode, orderId: string, role: "customer" | "ot" | "admin" }>) {
    const [data, setData] = useState<StatusType[]>([]);
    const cookies = useCookies();
    const [refresh, setRefresh] = useState(0);
    const { toast } = useToast();

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
    }, [orderId, refresh]);

    async function addStatus(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (role !== "ot") return;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/schedule-status/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                },
                body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))
            });
            const data = await response.json();

            if (response.ok) {
                setRefresh(refresh + 1);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while adding status. Please try again later.",
                variant: "destructive"
            });
        }
    }

    async function deleteStatus(id: number) {
        try {
            if (role !== "ot") return;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/order/schedule-status/${orderId}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('otToken')}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setRefresh(refresh + 1);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while deleting status. Please try again later.",
                variant: "destructive"
            });
        }
    }

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
                        <div className={cn("mt-4 grid grid-cols-[1fr_0.3fr_1fr_0.3fr] gap-x-4 mx-auto max-h-[calc(100svh-10rem)] overflow-y-auto", {
                            "grid-cols-[1fr_0.3fr_1fr_0.3fr_0.3fr_0.3fr]": role === "ot"
                        })}>
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
                                        {item.imageURL && (
                                                        <button
                                                            className="p-1 bg-gray-500 place-self-start text-lg text-white rounded"
                                                            onClick={() => {
                                                                window.open(process.env.NEXT_PUBLIC_API_URL + item.imageURL, '_blank');
                                                            }}
                                                        >
                                                            <MdOutlineRemoveRedEye />
                                                        </button>
                                                    )}
                                        {
                                            role === "ot" && (
                                                <>
                                                    <button
                                                        className="p-1 bg-red-500 place-self-start text-white rounded"
                                                        onClick={() => {
                                                            deleteStatus(item.id);
                                                        }}
                                                    >
                                                        <MdDelete />
                                                    </button>



                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button className="p-1 bg-blue-500 place-self-start text-lg text-white rounded">
                                                                <IoAdd />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className={cn("w-full")}>
                                                            <form className="flex gap-4 items-center justify-center" onSubmit={addStatus}>
                                                                <Input type="date" name="date" id="date" className={cn("w-full")} placeholder="Please select date" />
                                                                <Input type="text" name="status" id="status" className={cn("w-full")} placeholder="Please enter status" />
                                                                <Button size={"sm"}>Add</Button>
                                                            </form>
                                                        </PopoverContent>
                                                    </Popover>
                                                </>
                                            )
                                        }
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
