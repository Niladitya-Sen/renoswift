"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { FaCircleCheck } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


type DataType = {
    type: string;
    zipURL: string;
    url: string;
    isActive: boolean;
}

type VRType = {
    before: DataType;
    during: DataType;
    after: DataType;
}

export default function VRDetails({ params: { orderId } }: Readonly<{ params: { orderId: string } }>) {
    const [vr, setVr] = useState<VRType>();
    const cookies = useCookies();

    useEffect(() => {
        async function getVr() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/vr/${orderId}`, {
                headers: {
                    "Authorization": `Bearer ${cookies?.get('otToken')}`
                },
                cache: 'no-store'
            });
            const data = await response.json();
            setVr(data);
        }
        getVr();
    }, [orderId])

    return (
        <>
            <div className='flex items-center justify-between mr-4 mb-4'>
                <h1 className='px-4 py-2 bg-primary font-semibold uppercase text-lg text-white mb-4 rounded-sm'>Order ID - {orderId}</h1>
                <Link href="/ot/vr" className='text-primary'>
                    back
                </Link>
            </div>
            <section className='flex flex-col h-[85%]'>
                <div className='grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-4 gap-y-8 place-content-start'>
                    <ZipInput name='Before' orderId={orderId} {...vr?.before} />
                    <ZipInput name='During' orderId={orderId} {...vr?.during} />
                    <ZipInput name='After' orderId={orderId}  {...vr?.after} />
                </div>
            </section>
        </>
    )
}

function ZipInput(props: Readonly<{ name: string, orderId: string, zipURL?: string, url?: string, type?: string, isActive?: boolean }>) {
    const [changed, setChanged] = useState(false);
    const [edit, setEdit] = useState(false);
    const cookies = useCookies();
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSave() {
        setLoading(true);
        const formData = new FormData();
        const file = (document.getElementById(props.name) as HTMLInputElement).files?.[0];
        if (!file) return;

        formData.append(props.name.toLowerCase(), file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/vr/${props.orderId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies?.get('otToken')}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            setChanged(false);
            toast({
                description: data.message,
            });
            setEdit(false);
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <div>
            <label htmlFor={props.name} className='flex flex-col items-start gap-2'>
                <p className='font-semibold'>{props.name + " Remodelling"}</p>
                {
                    (props.zipURL && !edit) ? (
                        <div className='flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm justify-between items-center gap-2'>
                            <p>{props.zipURL?.split("/").pop()}</p>
                            <button className='bg-green-200 p-1 aspect-square rounded-full flex items-center justify-center' onClick={() => setEdit(true)}>
                                <FiEdit className='text-green-700 mb-[1px]' />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Input id={props.name} name={props.name} type='file' accept='application/zip' onChange={() => setChanged(true)} />
                            {
                                changed && <Button disabled={loading} className={cn("flex mx-auto mt-2")} onClick={handleSave}>
                                    {
                                        loading && <AiOutlineLoading3Quarters className='animate-spin' />
                                    }
                                    Save & Submit
                                </Button>
                            }
                        </>
                    )
                }
            </label>
            {
                props.url && (
                    <>
                        <p className='mt-8 font-semibold mb-2'>{props.name} Remodelling URL</p>
                        <div className='min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex items-center justify-between'>
                            <Link target='_blank' href={props.url}>{props.url}</Link>
                            {
                                props.isActive ? (<FaCircleCheck className='text-blue-500' />) : <></>
                            }
                        </div>
                        {
                            !props.isActive && (
                                <div className='flex items-center justify-center gap-2 mt-4'>
                                    <ApproveDialog type={props.type} isActive={props.isActive} />
                                    <RejectDialog />
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

function ApproveDialog({ type, isActive }: Readonly<{ type?: string, isActive?: boolean }>) {
    const params = useParams();
    const cookies = useCookies();
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function handleApprove() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ot/vr/approve/${params.orderId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${cookies?.get('otToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type
                })
            });
            const data = await response.json();

            if (response.ok) {
                toast({
                    description: data.message,
                });
                setOpen(false);
                window.location.reload();
            } else {
                toast({
                    description: data.message,
                    variant: 'destructive'
                });
            }
        } catch (e) {
            console.error(e);
            toast({
                description: 'Something went wrong! Please try again later.',
                variant: 'destructive'
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isActive}>{isActive ? "Approved" : "Approve"}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn('text-center bg-primary py-2 mx-2')}>Approve</DialogTitle>
                </DialogHeader>
                <p className='font-bold text-center text-lg my-8'>Are you sure you want to Approve this and MAKE IT LIVE ?</p>
                <div className='flex gap-4 items-center justify-center mt-4'>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleApprove}>Approve</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function RejectDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"}>Reject</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn('text-center bg-primary py-2 mx-2')}>Reject</DialogTitle>
                </DialogHeader>
                <div>
                    <p className='font-semibold mb-2'>Remarks</p>
                    <Textarea rows={5} />
                </div>
                <div className='flex gap-4 items-center justify-center mt-4'>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Submit</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
