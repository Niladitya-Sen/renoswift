"use client";

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { variants } from '@/lib/motion';

export default function Hero() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className='overflow-hidden relative isolate mt-8'
        >
            <CarouselContent>
                <CarouselItem>
                    <div className='h-full rounded-lg bg-[url("/assets/slide-1.jpg")] bg-no-repeat bg-center bg-cover p-8 flex flex-col justify-center relative isolate after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 after:rounded-lg after:from-[40%] after:to-transparent after:-z-10'>
                        <div className='ml-14 sm:ml-20 max-w-sm'>
                            <motion.h1
                                initial={variants.fadeIn().hidden}
                                whileInView={variants.fadeIn().visible}
                                className='heading-1 mb-4 text-white'
                            >
                                Gardening
                            </motion.h1>
                            <motion.p
                                initial={variants.fadeIn(0.25).hidden}
                                whileInView={variants.fadeIn(0.25).visible}
                                className='text-white mb-12'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, ea!
                            </motion.p>
                            <motion.div
                                initial={variants.fadeIn(0.4).hidden}
                                whileInView={variants.fadeIn(0.4).visible}
                                className='flex gap-2'
                            >
                                <Button>Buy Now</Button>
                                <Button variant={'outline'}>Get Discount</Button>
                            </motion.div>
                            <motion.p
                                initial={variants.fadeIn(0.6).hidden}
                                whileInView={variants.fadeIn(0.6).visible}
                                className='text-white font-semibold mt-12'
                            >
                                Get special price
                            </motion.p>
                            <motion.p
                                initial={variants.fadeIn(0.6).hidden}
                                whileInView={variants.fadeIn(0.6).visible}
                                className='text-white mt-1'>
                                &#8377; 149999.99
                            </motion.p>
                            <motion.p
                                initial={variants.fadeIn(0.65).hidden}
                                whileInView={variants.fadeIn(0.65).visible}
                                className='text-white mt-1 text-xs'>
                                **Product prices with discount are available until the end of stock**
                            </motion.p>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className='h-full rounded-lg bg-[url("/assets/slide-2.jpg")] bg-no-repeat bg-center bg-cover p-8 py-16 flex flex-col justify-center'>
                        <div className='ml-14 sm:ml-20 max-w-sm'>
                            <motion.h1
                                initial={variants.fadeIn().hidden}
                                whileInView={variants.fadeIn().visible}
                                className='heading-1 text-white uppercase'
                            >
                                Save now
                            </motion.h1>
                            <motion.h1
                                initial={variants.fadeIn().hidden}
                                whileInView={variants.fadeIn().visible}
                                className='heading-1 text-7xl text-white uppercase'
                            >
                                50%
                            </motion.h1>
                            <motion.h1
                                initial={variants.fadeIn().hidden}
                                whileInView={variants.fadeIn().visible}
                                className='heading-1 text-2xl mb-4 text-white uppercase'
                            >
                                on new kitchen
                            </motion.h1>
                            <motion.div
                                initial={variants.fadeIn(0.4).hidden}
                                whileInView={variants.fadeIn(0.4).visible}
                                className='flex gap-2'
                            >
                                <Button variant={'secondary'}>Shop Now</Button>
                            </motion.div>
                            <motion.p
                                initial={variants.fadeIn(0.6).hidden}
                                whileInView={variants.fadeIn(0.6).visible}
                                className='text-white font-semibold text-4xl mt-12'
                            >
                                Kitchen
                            </motion.p>
                            <motion.p
                                initial={variants.fadeIn(0.6).hidden}
                                whileInView={variants.fadeIn(0.6).visible}
                                className='text-white mt-1 text-xl'>
                                &#8377; 149999.99
                            </motion.p>
                            <motion.p
                                initial={variants.fadeIn(0.65).hidden}
                                whileInView={variants.fadeIn(0.65).visible}
                                className='text-white mt-1 text-xs'>
                                **Product prices with discount are available until the end of stock**
                            </motion.p>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className='h-full rounded-lg bg-[url("/assets/slide-3.jpg")] bg-no-repeat bg-center bg-cover flex items-center justify-center'>
                        <div className='max-w-sm text-center flex flex-col items-center justify-center'>
                            <motion.h1
                                initial={variants.fadeIn().hidden}
                                whileInView={variants.fadeIn().visible}
                                className='heading-1 mb-4 text-white'
                            >
                                Bathroom Furniture
                            </motion.h1>
                            <motion.p
                                initial={variants.fadeIn(0.25).hidden}
                                whileInView={variants.fadeIn(0.25).visible}
                                className='text-white mb-12'>
                                Score new arrivals from latest items
                                <br />
                                Multipurpose eCommerce template ready
                            </motion.p>
                            <motion.div
                                initial={variants.fadeIn(0.4).hidden}
                                whileInView={variants.fadeIn(0.4).visible}
                                className='flex gap-2'
                            >
                                <Button>New Collection</Button>
                                <Button variant={'outline'}>Get first discount</Button>
                            </motion.div>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='absolute left-8' />
            <CarouselNext className='absolute right-8' />
        </Carousel>

    )
}
