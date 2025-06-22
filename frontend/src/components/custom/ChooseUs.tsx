import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils';

const reasons = [
    {
        "title": "What Makes Us Different?",
        "description": "When it comes to renovating your space, RenovatePro® stands out for a multitude of reasons. We believe in not just renovating but revolutionizing your experience. Here's why choosing us is a decision you won't regret:"
    },
    {
        "title": "Innovative Design Concepts",
        "description": "At RenovatePro®, creativity is our cornerstone. Our design concepts aren't just about following trends; they're about setting them. We bring innovation to every project, ensuring your space is not only beautiful but ahead of its time."
    },
    {
        "title": "Extensive Product Range",
        "description": "Your choices should be as limitless as your imagination. That's why we offer an extensive product range, handpicked for quality and diversity. Whether you're aiming for modern chic or timeless elegance, our product range caters to every style."
    },
    {
        "title": "Transparent and User-Friendly Process",
        "description": "Renovations can be overwhelming, but with RenovatePro®, transparency is our promise. Our process is designed to be user-friendly, ensuring you are informed and involved at every step. No hidden surprises, just a smooth and transparent journey."
    },
    {
        "title": "Advanced Tracking and Communication",
        "description": "Communication is key, and we take it to the next level. Our advanced tracking systems keep you in the loop throughout the renovation process. You'll always know the status of your project, fostering trust and peace of mind."
    },
    {
        "title": "Customer-Centric Approach",
        "description": "You're not just a client; you're a valued part of the RenovatePro® family. Our customer-centric approach means your needs and satisfaction are at the forefront of everything we do. From the first consultation to the final reveal, your happiness is our priority."
    },
    {
        "title": "The RenovatePro® Advantage",
        "description": "Choosing RenovatePro® isn't just about renovating; it's about embracing a new standard of excellence. Our innovative design concepts, extensive product range, transparent process, advanced tracking, and customer-centric approach redefine the renovation experience. Say goodbye to the ordinary and welcome the extraordinary with RenovatePro®."
    }
];

function ChooseUsCard({ title, description, index }: Readonly<{ title: string, description: string, index: number }>) {
    return (
        <Card className={cn('bg-secondary transition-transform duration-300 hover:scale-95')}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>

    )
}

export default function ChooseUs() {
    return (
        <section className='my-20'>
            <h2 className='heading-1'>Why Choose RenovatePro®?</h2>
            <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-8'>
                {
                    reasons.map((reason, index) => (
                        <ChooseUsCard key={index} title={reason.title} description={reason.description} index={index + 1} />
                    ))
                }
            </div>
        </section>
    )
}
