"use client"
import { useState } from 'react';
import SectionWrapper from '@/components/custom/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPhoneVolume } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useToast } from '@/components/ui/use-toast';

export default function Contact() {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = () => {
        // Handle form submission here (e.g., send data to backend)

        // Show toast notification
        toast({
            description: 'Form submitted successfully! We will connect with you soon.',
        });

        // Clear input fields
        setName('');
        setEmail('');
        setPhone('');
        setInfo('');
    };

    return (
        <SectionWrapper className="relative flex flex-col-reverse sm:flex-row gap-4 items-center mt-10 w-full h-[80svh]">
            <div className='flex flex-col gap-4 w-full'>
                <h2 className="heading-1">Get in <span className='text-primary'>Touch</span></h2>
                <Input type="text" id="name" name="name" placeholder='Name*' value={name} onChange={(e) => setName(e.target.value)}  />
                <Input type="email" id="email" name="email" placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="text" id="phone" name="phone" placeholder='Phone Number*' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input type="text" id="info" name="info" placeholder='How did you find us ?*' value={info} onChange={(e) => setInfo(e.target.value)} />
                <Button onClick={handleSubmit}>Send</Button>
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
    );
}
