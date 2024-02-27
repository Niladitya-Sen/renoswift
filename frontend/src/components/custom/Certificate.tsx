import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FaCircleInfo } from "react-icons/fa6";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Certificate() {
    return (
        <section className="my-20">
            <div className="flex items-center justify-between">
                <h1 className='heading-1'>We are Certified!</h1>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FaCircleInfo className='text-3xl text-primary' />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Click on the certificate to view it in full size.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Image src='/assets/certificate.png' alt='Certificate' width={500} height={500} className='mt-8 mx-auto cursor-pointer' />
                </DialogTrigger>
                <DialogContent className={cn('max-w-[900px]')}>
                    <Image src='/assets/certificate.png' alt='Certificate' width={1536} height={1086} className='mt-8 mx-auto' />
                </DialogContent>
            </Dialog>
        </section>
    )
}
