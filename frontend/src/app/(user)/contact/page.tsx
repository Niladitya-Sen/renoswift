import SectionWrapper from '@/components/custom/SectionWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function Contact() {
    return (
        <SectionWrapper className="relative mt-10 w-full">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
                <iframe
                    title='map'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223960.2906516919!2d77.3597857!3d28.7082013!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff8a4bf2d6f%3A0xcac8cca1b277fdcc!2sRenoswift!5e0!3m2!1sen!2sin!4v1706711828654!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-secondary rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-secondary-foreground text-lg mb-8 font-medium">Contact Us</h2>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-secondary-foreground/80">Email</label>
                        <Input type="email" id="email" name="email" placeholder='Enter your email' />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="message" className="leading-7 text-sm text-secondary-foreground/80">Message</label>
                        <Textarea id="message" name="message" placeholder='Enter your message'></Textarea>
                    </div>
                    <Button>Send</Button>
                </div>
            </div>
        </SectionWrapper>
    )
}
