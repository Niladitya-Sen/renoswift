import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

const data = [
    {
        id: 1,
        date: "14 February 2024",
        status: "Requested Quote",
        completed: true
    },
    {
        id: 2,
        date: "15 February 2024",
        status: "Received Quote",
        completed: true
    },
    {
        id: 3,
        date: "16 February 2024",
        status: "Placed Order",
        completed: true
    },
    {
        id: 4,
        date: "17 February 2024",
        status: "Renovation Planning",
        completed: false
    },
    {
        id: 5,
        date: "18 February 2024",
        status: "Dismanlting",
        completed: false
    },
    {
        id: 6,
        date: "19 February 2024",
        status: "Piping",
        completed: false
    },
    {
        id: 7,
        date: "20 February 2024",
        status: "Electrical",
        completed: false
    },
    {
        id: 8,
        date: "21 February 2024",
        status: "Painting",
        completed: false
    },
    {
        id: 9,
        date: "22 February 2024",
        status: "Final Touches",
        completed: false
    },
    {
        id: 10,
        date: "23 February 2024",
        status: "Completed",
        completed: false

    },
    {
        id: 11,
        date: "24 February 2024",
        status: "Delivered",
        completed: false
    }
]


export default function AdminStatusTrackingDialog({ trigger }: Readonly<{ trigger: React.ReactNode }>) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Track Progress</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid grid-cols-[1fr_0.3fr_1fr] mx-auto max-h-[calc(100svh-10rem)] overflow-y-auto">
                    {data.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <p className="justify-self-end">{item.date}</p>
                            <div className="flex flex-col items-center justify-center mx-auto h-[4rem]">
                                <div className={cn("aspect-square w-4 h-5 rounded-full bg-green-500", {
                                    "bg-gray-300": !item.completed
                                })} />
                                <div className={cn("h-full w-[2.5px] bg-green-500 rounded-full", {
                                    "bg-gray-300": !item.completed,
                                    "invisible": index === data.length - 1
                                })} />
                            </div>
                            <p className="font-medium text-primary">{item.status}</p>
                        </React.Fragment>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
