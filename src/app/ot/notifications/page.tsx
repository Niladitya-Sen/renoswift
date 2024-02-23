"use client";

import { redirect } from 'next/navigation'

export default function NotificationsRedirect() {
    redirect('/ot/notifications/all')
}
