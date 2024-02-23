"use client";

import OperationsTeamConnectWithAdminDialog from '@/components/custom/OperationsTeamConnectWithAdminDialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';

const notifications = [
    {
        title: 'New message from John Doe',
        date: '26 Jul'
    },
    {
        title: 'New message from John Doe',
        date: '26 Jul'
    },
    {
        title: 'New message from John Doe',
        date: '26 Jul'
    }
];

const NotificationContext = createContext<{
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }

    return context;
}

export function NotificationsCard({ title, date }: { title: string, date: string }) {
    const notification = useNotification();

    return (
        <div className='bg-white p-4 flex gap-4 items-center border rounded-sm hover:shadow-md transition-shadow duration-300'>
            <div className='aspect-square w-[3rem] flex items-center justify-center bg-[#f0e9f4] px-2 py-1 text-center rounded-sm'>
                <p className='font-medium text-sm text-gray-500'>{date}</p>
            </div>
            <h3 className='font-semibold flex-1'>{title}</h3>
            <button className="border border-blue-500 text-blue-500 hover:bg-secondary transition-colors duration-200 px-4 py-2 rounded-sm" onClick={() => {
                notification?.setDialogOpen(true);
            }}>View</button>
        </div>
    )
}

export default function Notifications({ params: { type } }: { params: { type: string } }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <NotificationContext.Provider value={{ dialogOpen, setDialogOpen }}>
            <OperationsTeamConnectWithAdminDialog />
            <div className='mb-4 flex items-center justify-between'>
                <div className='space-x-4'>
                    <Link href="/ot/notifications/all" className={buttonVariants({
                        variant: type === 'all' ? 'default' : 'secondary'
                    })}>All</Link>
                    <Link href="/ot/notifications/unread" className={buttonVariants({
                        variant: type === 'unread' ? 'default' : 'secondary'
                    })}>Unread</Link>
                </div>
                <search className='border-2 rounded-lg p-2 pl-5 flex'>
                    <input type='text' placeholder='Search' className={cn('border-0 outline-none w-full')} />
                    <Search />
                </search>
            </div>
            <hr />
            <div className='mt-8 flex flex-col gap-4'>
                {
                    notifications.map((notification, index) => (
                        <NotificationsCard key={index} {...notification} />
                    ))
                }
            </div>
        </NotificationContext.Provider>
    )
}
