"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { variants } from '@/lib/motion';
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';
import Image from 'next/image';
export default function Downweb() {
    return (
        <section >
            <div style={{
               display : "flex",
               alignItems : "center",
               flexDirection : "column",
               justifyContent : "center",
               marginTop : "15%",
               padding : "20px"
            }}>
                <div>
                <Image src='/assets/logo.jpg' alt='logo' width={200} height={100} />
                </div>

                <div style={{
                    marginTop : "20px",
                    textAlign : "center"
                    
                }}>
                We are currently working on enhancing your experience. Our website is under construction and will be live soon!
                </div>
            </div>


        </section>
    )
}
