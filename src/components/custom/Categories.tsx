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


const categories = [
    {
        title: 'Bathtubs',
        description: 'Asthetic Design',
        image: '/assets/product-1.jpg'
    },
    {
        title: 'Showers',
        description: 'New Collection',
        image: '/assets/product-2.jpg'
    },
    {
        title: 'Bathroom',
        description: 'Modern Design',
        image: '/assets/product-3.jpg'
    },
];

function CategoryCard({ title, description, image }: { title: string, description: string, image: string }) {
    return (
        <Card className={cn('bg-cover bg-center bg-no-repeat aspect-video overflow-hidden transition-all duration-500 group hover:scale-[0.95] cursor-pointer')} style={{ backgroundImage: `url('${image}')` }}>
            <CardHeader className='bg-gradient-to-b from-black/50 from-[30%] to-transparent h-full'>
                <CardDescription className={cn('text-white/80')}>{description}</CardDescription>
                <CardTitle className={cn('text-white')}>{title}</CardTitle>
                <motion.div
                    className='flex flex-col items-center justify-center flex-1 translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500'
                >
                    <div className='flex-grow'></div>
                    <Button>Request Quote</Button>
                </motion.div>
            </CardHeader>
        </Card>

    )
}

export default function Categories() {
    return (
        <section className='my-20'>
            <h1 className='heading-1 mb-2'>Featured Categories</h1>
            <p className='text-foreground/80 mb-8'>We keep things minimal.</p>
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
