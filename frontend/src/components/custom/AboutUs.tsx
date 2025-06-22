"use client";

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Button } from '../ui/button';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <section id="about" className="flex flex-col-reverse md:flex-row gap-12 items-center justify-between mt-10">
            <div className="max-w-md">
                <h2 className="heading-1">About <span className='text-primary'>Us</span></h2>
                <p className="mt-[1em] max-w-lg">
                    Welcome to RenovatePro. Your Premier Destination for Bathroom Transformations! We understand the importance of a well-designed and functional bathroom. Whether you&apos;re dreaming of a luxurious or a sleek modern space, our expert team is here to bring your vision to life. With a focus on innovation, quality, and customer satisfaction, we&apos;re dedicated to delivering stunning results that exceed your expectations. Explore our range of services and let us bring your vision to life.
                </p>
                <Button className='mt-6' asChild>
                    <Link href='/about'>Know More</Link>
                </Button>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className={cn('overflow-hidden relative isolate mt-8 max-w-md w-fit')}
            >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src='/assets/about-slide-1.jpg'
                            alt='slide'
                            width={350}
                            height={350}
                            className="rounded-lg object-cover object-center w-full"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/assets/about-slide-2.jpg'
                            alt='slide'
                            width={350}
                            height={350}
                            className="rounded-lg object-cover object-center w-full"
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/assets/about-slide-3.jpg'
                            alt='slide'
                            width={350}
                            height={350}
                            className="rounded-lg object-cover object-center w-full"
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='absolute left-8 hidden sm:inline-flex' />
                <CarouselNext className='absolute right-8 hidden sm:inline-flex' />
            </Carousel>
        </section>
    )
}
