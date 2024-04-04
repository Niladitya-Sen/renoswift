import SectionWrapper from '@/components/custom/SectionWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaPhoneVolume } from "react-icons/fa6"
import { HiOutlineMailOpen } from "react-icons/hi"

export default function Contact() {
    return (
        <SectionWrapper className="relative flex flex-col-reverse sm:flex-row gap-4 items-center mt-10 w-full h-[80svh]">
            {/* <div className="absolute inset-0 rounded-lg overflow-hidden">
                <iframe
                    title='map'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223960.2906516919!2d77.3597857!3d28.7082013!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff8a4bf2d6f%3A0xcac8cca1b277fdcc!2sRenoswift!5e0!3m2!1sen!2sin!4v1706711828654!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div> */}
            {/* <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-secondary rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-secondary-foreground text-lg mb-8 font-medium">Contact Us</h2>
                    <div>
                        <label htmlFor="email" className="leading-7 text-sm text-secondary-foreground/80">Email</label>
                        <Input type="email" id="email" name="email" placeholder='Enter your email' />
                    </div>
                    <div>
                        <label htmlFor="message" className="leading-7 text-sm text-secondary-foreground/80">Message</label>
                        <Textarea id="message" name="message" placeholder='Enter your message'></Textarea>
                    </div>
                    <Button>Send</Button>
                </div>
            </div> */}
            <div className='flex flex-col gap-4 w-full'>
                <h2 className="heading-1">Get in <span className='text-primary'>Touch</span></h2>
                <Input type="text" id="name" name="name" placeholder='Name*' />
                <Input type="email" id="email" name="email" placeholder='Email*' />
                <Input type="text" id="phone" name="phone" placeholder='Phone Number*' />
                <Input type="text" id="info" name="info" placeholder='How did you find us ?*' />
                <Button>Send</Button>
                <div className='flex flex-wrap gap-4'>
                    <div className='flex gap-4 items-center'>
                        <FaPhoneVolume className='text-2xl' />
                        <div>
                            <h4 className='font-semibold uppercase'>Phone</h4>
                            <p className='text-primary'>+91 9205022725</p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <FaPhoneVolume className='text-2xl' />
                        <div>
                            <h4 className='font-semibold uppercase'>Phone</h4>
                            <p className='text-primary'>+91 1204902825</p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <FaPhoneVolume className='text-2xl' />
                        <div>
                            <h4 className='font-semibold uppercase'>Phone</h4>
                            <p className='text-primary'>+91 9818204406</p>
                        </div>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <HiOutlineMailOpen className='text-2xl' />
                        <div>
                            <h4 className='font-semibold uppercase'>Email</h4>
                            <p className='text-primary'>info@renoswift.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex items-center justify-center relative rounded-xl overflow-hidden'>
                <iframe
                    title='map'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d223960.2906516919!2d77.3597857!3d28.7082013!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff8a4bf2d6f%3A0xcac8cca1b277fdcc!2sRenoswift!5e0!3m2!1sen!2sin!4v1706711828654!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className='absolute inset-0 sm:inset-auto sm:w-[30rem] sm:h-[30rem] z-10'
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className='w-1/2 h-full bg-primary ml-auto'></div>
            </div>
        </SectionWrapper>
    )
}
