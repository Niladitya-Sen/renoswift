"use client";

import { redirect } from 'next/navigation'

export default function NotificationsRedirectCS() {
    redirect('/customer/notification/all')
}
