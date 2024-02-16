"use client";

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function OTPInput({ value, setValue }: Readonly<{ value: string[], setValue: React.Dispatch<React.SetStateAction<string[]>> }>) {

    const [time, setTime] = useState(30);
    const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout>();
    const [resend, setResend] = useState(false);
    const [disable, setDisable] = useState(false);

    const countDown = () => {
        setTimeInterval(setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000));

        setResend(true);
        setDisable(true);
    }

    useEffect(() => {
        if (time === 0) {
            setTime(30);
            clearInterval(timeInterval);
            setDisable(false);
        }
    }, [time]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(e.target.name);
        const value = e.target.value;
        if (value.length > 1) return;

        setValue(prev => {
            const newOtp = [...prev];
            newOtp[index] = value;
            return newOtp;
        });

        if (value.length === 1 && index <= 3) {
            try {
                (e.target.nextElementSibling as HTMLInputElement).focus();
            } catch (error) {
                (e.target.parentElement?.firstElementChild as HTMLInputElement).focus();
            }
        }
    }

    return (
        <div className='flex flex-wrap items-center justify-between gap-4 my-4'>
            <div className='flex gap-1 w-[12rem]'>
                <Input
                    name="0"
                    maxLength={1}
                    minLength={1}
                    inputMode='numeric'
                    className={cn('font-semibold text-center bg-secondary')}
                    autoComplete='off'
                    onChange={handleOtpChange}
                />
                <Input
                    name="1"
                    maxLength={1}
                    minLength={1}
                    inputMode='numeric'
                    className={cn('font-semibold text-center bg-secondary')}
                    autoComplete='off'
                    onChange={handleOtpChange}
                />
                <Input
                    name="2"
                    maxLength={1}
                    minLength={1}
                    inputMode='numeric'
                    className={cn('font-semibold text-center bg-secondary')}
                    autoComplete='off'
                    onChange={handleOtpChange}
                />
                <Input
                    name="3"
                    maxLength={1}
                    minLength={1}
                    inputMode='numeric'
                    className={cn('font-semibold text-center bg-secondary')}
                    autoComplete='off'
                    onChange={handleOtpChange}
                />
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <p>00:{time.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                })}</p>
                <Button type="button" variant={'ghost'} disabled={disable} onClick={countDown}>
                    {
                        resend ? 'Resend OTP' : 'Send OTP'
                    }
                </Button>
            </div>
        </div>
    )
}
