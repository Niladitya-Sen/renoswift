"use client";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from "next/link";


const categories = [
    {
        title: 'Essence',
        description: 'Affordable & Functional',
        image: '/assets/product-3.png'
    },
    {
        title: 'Elegance',
        description: 'Balanced & Comprehensive',
        image: '/assets/product-2.png'
    },
    {
        title: 'Luxe',
        description: 'Customized & Exclusive',
        image: '/assets/product-1.png'
    },
];

function CategoryCard({ title, description, image }: Readonly<{ title: string, description: string, image: string }>) {
    return (
        <Card className={cn('bg-cover bg-center bg-no-repeat aspect-video overflow-hidden transition-all duration-500 group hover:scale-[0.95] cursor-pointer')} style={{ backgroundImage: `url('${image}')` }}>
            <CardHeader className='bg-gradient-to-tr from-black/60 from-[30%] to-transparent h-full'>
                <motion.div
                    className='flex flex-col items-center justify-center flex-1 translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'
                >
                    <div className='flex-grow'></div>
                    <Button asChild>
                        <Link href="/auth/login">
                            Request Quote
                        </Link>
                    </Button>
                </motion.div>
                <CardTitle className={cn('text-primary')}>{title}</CardTitle>
                <CardDescription className={cn('text-white/80')}>{description}</CardDescription>
            </CardHeader>
        </Card>

    )
}

export default function Categories() {
    return (
        <section id="feature" className='my-20'>
            <h1 className='heading-1 mb-2'>Featured <span className="text-primary">Packages</span></h1>
            <p className='text-foreground/80 mb-8'>Explore our spectrum of plans to meet all your needs.</p>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
                {
                    categories.map((category, index) => (
                        <CategoryCard key={index} {...category} />
                    ))
                }
            </div>
        </section>
    )
}
