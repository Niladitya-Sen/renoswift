import SectionWrapper from '@/components/custom/SectionWrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IoMapOutline } from "react-icons/io5";

export default function Quotation() {
    return (
        <SectionWrapper>
            <h1 className='heading-1 text-2xl text-center underline decoration-primary underline-offset-4 decoration-4'>Request Quotation</h1>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10'>
                <label htmlFor="name" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Name</p>
                    <input name="name" type="text" id="name" className='outline-none w-full' />
                </label>
                <label htmlFor="phone" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Contact Number</p>
                    <input
                        name="phone"
                        type="text"
                        id="phone"
                        inputMode='numeric'
                        minLength={10}
                        maxLength={10}
                        className='outline-none w-full'
                        pattern='[0-9]{10}'
                    />
                </label>
                <label htmlFor="email" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Email ID</p>
                    <input name="email" type="email" id="email" inputMode='email' className='outline-none w-full' />
                </label>
                <label htmlFor="country" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Country</p>
                    <input name="country" type="text" id="country" className='outline-none w-full' />
                </label>
                <label htmlFor="state" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>State</p>
                    <input name="state" type="text" id="state" className='outline-none w-full' />
                </label>
                <label htmlFor="date" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Expected Remodeling Date</p>
                    <input name="date" type="date" id="date" className='outline-none w-full' />
                </label>
                <label htmlFor="zipcode" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <p className='text-secondary-foreground/50 font-medium'>Zip Code</p>
                    <input name="zipcode" type="text" id="zipcode" className='outline-none w-full' />
                </label>
                <div className='hidden sm:block'></div>
                <label htmlFor="address" className='border-secondary-foreground/20 border-2 block rounded-lg py-2 px-4'>
                    <div className='text-secondary-foreground/50 font-medium'>
                        <IoMapOutline className='inline-block text-lg mr-2' />
                        Delivery Address
                    </div>
                    <textarea name="address" id="address" className='outline-none w-full min-h-[2lh]' />
                </label>
                <textarea name="request" id="request" className='outline-none border-secondary-foreground/20 border-2 rounded-lg w-full min-h-[5lh] py-2 px-4' placeholder='Send Message for Special Request (if any)' />
                <div className='flex gap-4 col-span-full items-center justify-center mt-4'>
                    <Button size={'lg'} variant={'outline'} className={cn('border-2 border-primary text-primary')}>Back</Button>
                    <Button size={'lg'} >Send Request</Button>
                </div>
            </form>
        </SectionWrapper>
    )
}
