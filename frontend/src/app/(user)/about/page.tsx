"use client";

import Certificate from "@/components/custom/Certificate";
import SectionWrapper from "@/components/custom/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsLinkedin } from "react-icons/bs";

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

const teamMembers = [
    {
        image: '/assets/team-1.png',
        name: 'Bhavesh Dev Sanger',
        role: 'Co-Founder & CEO',
        description: 'He has 15+ years of Sales & Team handling experience with world-renowned brands in piping, sanitary and drainage products both in Indian and International Markets.',
        linkedIn: "https://www.linkedin.com/in/bhavesh-sanger-5045051a/"
    },
    {
        image: '/assets/team-2.png',
        name: 'Ambikkaa Panwar',
        role: 'Co-Founder',
        description: '14+ years of experience and has been instrumental in adding value to the company in the sectors of Marketing, Finance & Managing Imports.',
        linkedIn: "https://www.linkedin.com/in/ambikkaa-panwar-b1125430/"
    },
    {
        image: '/assets/team-3.png',
        name: 'Neetu Jha',
        role: 'CHRO',
        description: 'She plays a pivotal role in shaping the company\'s workforce strategy and fostering a positive and inclusive work culture.',
        linkedIn: "#"
    },
    {
        image: '/assets/team-4.png',
        name: 'Rupam Bhattacharjee',
        role: 'CTO',
        description: '20+ years of experience and ensuring cutting-edge solutions and transformative strategies for a tech-driven future.',
        linkedIn: "https://www.linkedin.com/in/waysahead/"
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
                    width={450}
                    height={350}
                    className="rounded-lg object-cover object-center"
                />
            </section>

            <section className="bg-secondary rounded-lg p-8 sm:p-12 mt-[4em] flex flex-col gap-12 items-start justify-between">
                <div>
                    <h2 className="heading-1 text-2xl">Meet Our Team</h2>
                    <p className="mt-[1em]">
                        Our team is the heart of Renoswift®. Comprising young, enthusiastic professionals with a pulse on the market and seasoned management with over a decade of experience, we offer a perfect blend of freshness and expertise. Together, we provide you with a service that&apos;s the best of both worlds.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 self-center">
                    {
                        teamMembers.map((member, index) => (
                            <div key={index} className="max-w-[300px] bg-primary/50 p-5 rounded-lg flex flex-col gap-2 text-center items-center">
                                <div className="bg-white rounded-full">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={200}
                                        height={200}
                                        className="object-cover object-center rounded-lg w-32 h-32"
                                    />
                                </div>
                                <h3 className="mt-2 font-semibold text-lg">{member.name}</h3>
                                <h4 className="font-medium -mt-1">{member.role}</h4>
                                <p>{member.description}</p>
                                <div className="flex-grow"></div>
                                <Link href={member.linkedIn} target="_blank" className="flex items-center justify-center gap-4 mt-4">
                                    <button className={cn('bg-blue-500 hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 py-3 px-4 rounded-sm')}>
                                        <div className="bg-white rounded-sm">
                                            <BsLinkedin size={24} className="text-[#0077b5]" />
                                        </div>
                                        <p className="text-white font-medium">Connect</p>
                                    </button>
                                </Link>
                            </div>
                        ))
                    }
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

            <Certificate />

            <section className="text-center space-y-4 text-xl font-medium mt-20 bg-secondary rounded-lg p-8 sm:p-12">
                <p>We Create A Home Space Of Your Dreams</p>
                <p>We use products of renowned national and international brands for our projects.</p>
                <Button size={"lg"}>REQUEST A QUOTE</Button>
            </section>
        </SectionWrapper>
    )
}