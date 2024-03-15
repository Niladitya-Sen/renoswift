"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useToast } from '../ui/use-toast';

export default function FileInput(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { title?: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileURL, setFileURL] = useState<string>(props.accept?.includes("image") ? "/assets/defaultImage.png" : "/assets/defaultVideo.png");
    const { toast } = useToast();
    const [fileType, setFileType] = useState("image");

    const addFile = () => {
        inputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }

        const file = files[0];
        if (file.size > 1024 * 1024 * 5) {
            toast({
                title: "File size too large",
                description: "Please upload a file less than 5MB",
                variant: "destructive"
            });
            return;
        }
        setFileType(file.type);
        setFileURL(URL.createObjectURL(file));
    }

    const removeFile = () => {
        setFileURL("/assets/defaultImage.png");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full max-h-[260px]'>
            <p className='font-semibold text-lg self-start mb-2'>{props.title}</p>
            {
                fileType.includes("image") ? (
                    <Image
                        src={fileURL}
                        alt="default image"
                        width={200}
                        height={200}
                        className='object-cover object-center w-full rounded-lg flex-1 max-h-[160px]'
                    />
                ) : (
                    <video src={fileURL}
                        controls={false}
                        className='rounded-lg max-h-[160px] flex-1 w-full'
                    ></video>
                )
            }
            <input ref={inputRef} type="file" {...props} className='invisible w-0 h-0' onChange={handleFileChange} />
            <div className='flex items-center justify-between gap-2 mt-2 border p-2 w-[6rem] rounded-[5px]' style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 3.2px 3.2px 8px 0px inset, rgb(255, 255, 255) -3.2px -3.2px 8px 0px inset"
            }}>
                <button type='button' className='bg-red-200 p-1 rounded-[5px]' onClick={removeFile}>
                    <RiDeleteBin5Line className='text-red-500 text-xl' />
                </button>
                <button type='button' className='bg-blue-200 p-1 rounded-[5px]' onClick={addFile}>
                    <BsPlus className='text-blue-500 text-xl' />
                </button>
            </div>
        </div>
    )
}
