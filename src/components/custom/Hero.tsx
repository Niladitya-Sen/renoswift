"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { variants } from '@/lib/motion';
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className='relative'>
            <div className='text-center absolute z-[2] flex flex-col items-center justify-center w-full h-full'>
                <motion.h1
                    className='heading-1 mb-2 max-w-lg text-white'
                    initial={variants.fadeIn(0.1).hidden}
                    whileInView={variants.fadeIn(0.1).visible}
                >
                    Design Your Dream Bathroom From Inspiration
                </motion.h1>
                <motion.p
                    initial={variants.fadeIn(0.25).hidden}
                    whileInView={variants.fadeIn(0.25).visible}
                    className='mb-8 max-w-xl text-white'
                >
                    Say goodbye to bathroom worries! Our full-service renovations cover every step, from tearing down to tile-up. Contact us today and watch your dream bathroom come to life.
                </motion.p>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className='overflow-hidden relative z-[1] isolate'
            >
                <CarouselContent>
                    <CarouselItem>
                        <motion.div
                            initial={variants.scaleOut.hidden}
                            whileInView={variants.scaleOut.visible}
                            className='h-[35rem] scale-105 bg-[url("/assets/slide-1.jpg")] bg-no-repeat bg-center bg-cover p-8 flex flex-col items-center justify-center relative isolate after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 after:from-[50%] after:to-transparent after:-z-10'
                        >
                            {/* <div className='max-w-lg text-center'>
                                <motion.p
                                    initial={variants.fadeIn(0.1).hidden}
                                    whileInView={variants.fadeIn(0.1).visible}
                                    className='heading-1 text-white text-2xl mb-4'
                                >
                                    Transforming Spaces: RenoSwift&apos;s Vision for Your Dream Bathroom
                                </motion.p>
                                <motion.p
                                    initial={variants.fadeIn(0.25).hidden}
                                    whileInView={variants.fadeIn(0.25).visible}
                                    className='text-white text-sm font-medium mb-12'>
                                    At RenoSwift, we embark on a journey with you to turn your bathroom dreams into reality. Committed to innovation and unwavering quality, we are more than just a renovation service - we are your dedicated companions in transforming your space.
                                </motion.p>
                                <motion.div
                                    initial={variants.fadeIn(0.4).hidden}
                                    whileInView={variants.fadeIn(0.4).visible}
                                    className='flex items-center justify-center w-full gap-2'
                                >
                                    <Button>Request a Quote</Button>
                                </motion.div>
                            </div> */}
                        </motion.div>
                    </CarouselItem>
                    <CarouselItem>
                        <motion.div
                            initial={variants.scaleOut.hidden}
                            whileInView={variants.scaleOut.visible}
                            className='h-[35rem] bg-[url("/assets/slide-2.jpg")] bg-no-repeat bg-center bg-cover p-8 py-16 flex flex-col items-center justify-center relative isolate after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 after:from-[50%] after:to-transparent after:-z-10'
                        >
                            {/* <div className='max-w-lg text-center'>
                                <motion.p
                                    initial={variants.fadeIn(0.1).hidden}
                                    whileInView={variants.fadeIn(0.1).visible}
                                    className='heading-1 text-white text-2xl mb-4'
                                >
                                    Crafting Timeless Elegance: Your Bathroom, Our Expertise
                                </motion.p>
                                <motion.p
                                    initial={variants.fadeIn(0.25).hidden}
                                    whileInView={variants.fadeIn(0.25).visible}
                                    className='text-white text-sm font-medium mb-12'
                                >
                                    Renoswift®️ revolutionizes the renovation experience by bringing expert services right to your doorstep. Our team is driven by a passion for delivering quality work, always on time. As your one-stop solution for home renovations, we take pride in the seamless integration of our Design and Technical teams.
                                </motion.p>
                            </div> */}
                        </motion.div>
                    </CarouselItem>
                    <CarouselItem>
                        <motion.div
                            initial={variants.scaleOut.hidden}
                            whileInView={variants.scaleOut.visible}
                            className='h-[35rem] bg-[url("/assets/slide-3.jpg")] bg-no-repeat bg-center bg-cover p-8 py-16 flex flex-col items-center justify-center relative isolate after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/50 after:from-[50%] after:to-transparent after:-z-10'
                        >
                            {/* <div className='max-w-lg text-center'>
                                <motion.p
                                    initial={variants.fadeIn(0.1).hidden}
                                    whileInView={variants.fadeIn(0.1).visible}
                                    className='heading-1 text-white text-2xl mb-4'
                                >
                                    RenoSwift: Where Innovation Meets Bathroom Design Excellence
                                </motion.p>
                                <motion.p
                                    initial={variants.fadeIn(0.25).hidden}
                                    whileInView={variants.fadeIn(0.25).visible}
                                    className='text-white text-sm font-medium'
                                >
                                    Our Design team specializes in curating beautiful and personalized designs for your home, ensuring a touch of elegance in every corner. Meanwhile, our Technical team, equipped with years of expertise, ensures a bespoke and high-quality experience, all within a budget that suits your needs.
                                </motion.p>
                                <motion.p
                                    initial={variants.fadeIn(0.45).hidden}
                                    whileInView={variants.fadeIn(0.45).visible}
                                    className='text-white text-sm mt-2 font-medium'
                                >
                                    Embark on a journey with RenoSwift, where excellence meets affordability. Your dream bathroom awaits - let&apos;s make it a reality together!
                                </motion.p>
                            </div> */}
                        </motion.div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    )
}
