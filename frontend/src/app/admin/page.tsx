import AdminAnalytics from '@/components/custom/admin/AdminAnalytics'
import AdminGraphicalAnalytics from '@/components/custom/admin/AdminGraphicalAnalytics'
import React from 'react'

export default function Dashboard() {
    return (
        <div className='space-y-12'>
            <h1 className='heading-1 text-xl underline decoration-4 decoration-primary underline-offset-[5px]'>Dashboard</h1>
            <AdminAnalytics />
            <AdminGraphicalAnalytics />
        </div>
    )
}
