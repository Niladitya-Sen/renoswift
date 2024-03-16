import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';

const inspirations = [
    {
        id: 1,
        name: 'Renovation at Your Doorstep',
        btnText: 'Open up for easy living',
        image: '/assets/design.jpg',
    },
    {
        id: 2,
        name: 'Sink',
        btnText: 'Traditional looks',
        image: '/assets/product-9.jpg',
    },
    {
        id: 3,
        name: 'Toilets',
        btnText: 'Sleek and sustainable',
        image: '/assets/product-11.jpg',
    },
    {
        id: 4,
        name: 'Bathroom',
        btnText: 'Compact living',
        image: '/assets/product-12.jpg',
    },
    {
        id: 5,
        name: 'Showers',
        btnText: 'Classic design',
        image: '/assets/product-5.jpg',
    },
];

function InspirationCard({ name, btnText, image, className }: Readonly<{ name: string, btnText: string, image: string, className?: string }>) {
    return (
        <div className={cn('h-[20rem] rounded-lg transition-all bg-cover bg-center duration-300 hover:scale-[0.95] overflow-hidden', className)} style={{ backgroundImage: `url("${image}")` }}>
            <div className='bg-gradient-to-t from-black/50 to-transparent h-full flex flex-col justify-end p-8'>
                <h1 className='heading-1 text-white mb-4'>{name}</h1>
                <Button className={cn('w-fit')}>{btnText}</Button>
            </div>
        </div>
    )
}

export default function Inspiration() {
    return (
        <section className='my-20'>
            <h1 className='heading-1 mb-2'>Interior inspiration</h1>
            <p className='text-foreground/80 mb-8'>Create an inviting space for yourself and family.</p>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-3 gap-4'>
                {
                    inspirations.map((inspiration, index) => (
                        index === 0 ? (
                            <InspirationCard key={index} {...inspiration} className='md:col-[1/3]' />
                        ) : (
                            <InspirationCard key={index} {...inspiration} />
                        )
                    ))
                }
            </div>
        </section>
    )
}
