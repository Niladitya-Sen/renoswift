"use client";

import SectionWrapper from "@/components/custom/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

const reasons = [
    {
        "title": "Swiftness",
        "description": "Renovations don't have to be a hassle. We take pride in providing the swiftest renovation services possible, ensuring minimal disruption to your daily life."
    },
    {
        "title": "Skilled Team",
        "description": "Our team is not just skilled; they're constantly upgraded on the latest tools and techniques. This commitment ensures they deliver nothing less than top-notch quality in every project."
    },
    {
        "title": "Quality",
        "description": "Your home deserves the best. That's why we use only the highest quality products for your renovation needs, ensuring durability and a touch of luxury."
    },
    {
        "title": "Expertise",
        "description": "With over a decade and a half of experience in the renovation space, our expertise is unmatched. It reflects in the craftsmanship and precision we bring to every project."
    }
];

function ChooseUsCard({ title, description, index }: Readonly<{ title: string, description: string, index: number }>) {
    return (
        <Card className={cn('bg-primary/20 hover:bg-primary/50 transition-all duration-300 hover:scale-95')}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>

    )
}

export default function About() {
    return (
        <SectionWrapper>
            <h1 className="heading-1 text-center my-[2em]">RenoSwift: Crafting Your Dream Bathroom Experience</h1>

            <section className="bg-secondary rounded-lg p-8 sm:p-12 mt-[4em] flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
                <div className="max-w-md">
                    <h2 className="heading-1 text-2xl">WE ARE Renoswift®</h2>
                    <p className="mt-[1em] max-w-lg">
                        At Renoswift®, we are not just renovators; we are your partners in transforming your bathroom dreams into reality. Our commitment to innovation and quality sets us apart as we bring expertise and creativity to every project, ensuring your bathroom is a stunning masterpiece.
                    </p>
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

            <section className="bg-primary/20 rounded-lg p-8 sm:p-12 mt-[4em] flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
                <div>
                    <h2 className="heading-1 text-2xl">Renovation at Your Doorstep</h2>
                    <p className="mt-[1em] max-w-md">
                        Renoswift®️ brings top-notch renovation services to your doorstep. Our expert team is dedicated to delivering quality work with on-time precision. We&apos;re not just about renovating spaces; we&apos;re your one-stop solution for all your home renovation needs.
                    </p>
                </div>
                <Image
                    src='/assets/renovation-1.jpg'
                    alt='renovation'
                    width={350}
                    height={350}
                    className="rounded-lg object-cover object-center"
                />
            </section>

            <section className="bg-secondary rounded-lg p-8 sm:p-12 mt-[4em] flex flex-col-reverse md:flex-row gap-12 items-center justify-between">
                <div className="max-w-lg">
                    <h2 className="heading-1 text-2xl">Meet Our Team</h2>
                    <p className="mt-[1em]">
                        Our team is the heart of Renoswift®. Comprising young, enthusiastic professionals with a pulse on the market and seasoned management with over a decade of experience, we offer a perfect blend of freshness and expertise. Together, we provide you with a service that&apos;s the best of both worlds.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 place-items-center">
                    <Image
                        src={'/assets/team-1.jpg'}
                        alt={'team'}
                        width={350}
                        height={350}
                        className="object-cover object-center rounded-lg row-[1/3]"
                    />
                    <Image
                        src={'/assets/team-2.jpg'}
                        alt={'team'}
                        width={350}
                        height={350}
                        className="object-cover object-center rounded-lg"
                    />
                    <Image
                        src={'/assets/team-3.jpg'}
                        alt={'team'}
                        width={350}
                        height={350}
                        className="object-cover object-center rounded-lg"
                    />
                </div>
            </section>

            <section className="bg-primary/20 rounded-lg p-8 sm:p-12 mt-[4em]">
                <h2 className="heading-1 text-2xl">Why Choose Us?</h2>
                <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-8">
                    {
                        reasons.map((reason, index) => (
                            <ChooseUsCard
                                key={index}
                                title={reason.title}
                                description={reason.description}
                                index={index + 1}
                            />
                        ))
                    }
                </div>
            </section>

            <section className="text-center space-y-4 text-xl font-medium mt-20 bg-secondary rounded-lg p-8 sm:p-12">
                <p>We Create A Home Space Of Your Dreams</p>
                <p>We use products of renowned national and international brands for our projects.</p>
                <Button size={"lg"}>REQUEST A QUOTE</Button>
            </section>
        </SectionWrapper>
    )
}