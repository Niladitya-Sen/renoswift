"use client";

import { createContext, useContext, useMemo, useState } from "react";

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

export function NotificationProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const values = useMemo(() => ({ dialogOpen, setDialogOpen }), [dialogOpen, setDialogOpen]);

    return (
        <NotificationContext.Provider value={values}>
            {children}
        </NotificationContext.Provider>
    )
}