"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from '@/hooks/useCookies';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type DataType = {
    type: string;
    zipURL: string;
    url: string;
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dev/projects/${orderId}`, {
                headers: {
                    "Authorization": `Bearer ${cookies?.get('devToken')}`
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
                <Link href="/dev" className='text-primary'>
                    back
                </Link>
            </div>
            <section className='flex flex-col h-[85%] w-full'>
                <div className='flex flex-col gap-4 w-full'>
                    <ZipURLInput name='Before' orderId={orderId} {...vr?.before} />
                    <ZipURLInput name='During' orderId={orderId} {...vr?.during} />
                    <ZipURLInput name='After' orderId={orderId}  {...vr?.after} />
                </div>
            </section>
        </>
    )
}

function ZipURLInput(props: Readonly<{ name: string, orderId: string, zipURL?: string, url?: string, type?: string }>) {
    const cookies = useCookies();
    const { toast } = useToast();
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (props.url) setUrl(props.url);
    }, [props.url])

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dev/projects/vr/${props.orderId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookies?.get('devToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [props.name.toLowerCase()]: url,
                    type: props.name.toLowerCase()
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    description: data.message,
                });
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
        <form onSubmit={handleSave} className='flex gap-4 items-center justify-between w-full max-w-screen-lg'>
            <div className='flex flex-col items-start gap-2 w-full'>
                <p className='font-semibold'>{props.name + " Remodelling"}</p>
                <div className='flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm justify-between items-center gap-2'>
                    <p>{props.zipURL?.split("/").pop()}</p>
                    <Button disabled={!props.zipURL} type='button' variant={"outline"} size={"sm"} className={cn('border-blue-500')}>
                        <Link target='_blank' href={process.env.NEXT_PUBLIC_API_URL + "/" + props.zipURL}>
                            <p className='text-blue-500 text-xs mb-[1px]'>Download</p>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col items-start gap-2 w-full'>
                <p className='font-semibold'>{props.name + " Remodelling"}</p>
                <Input type='url' name={props.name.toLowerCase()} autoComplete='off' value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
            </div>
            <Button disabled={!props.zipURL} className={cn('self-end mb-2')}>
                {
                    props.url ? "Update" : "Submit"
                }
            </Button>
        </form>
    )
}
