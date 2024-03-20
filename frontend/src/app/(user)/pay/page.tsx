"use client";

import React, { useEffect, useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCookies } from "@/hooks/useCookies";

export default function Pay() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cvvNumber, setCvvNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState({
        month: "",
        year: "",
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const cookies = useCookies();
    const [amount, setAmount] = useState("");
    const [phase, setPhase] = useState("");

    useEffect(() => {
        async function getPaymentDetails() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/amount/${searchParams.get("pid")})}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('token')}`
                },
                cache: 'no-store'
            });
            const data = await response.json();
            if (response.ok) {
                setAmount(data.amountPaid as string);
                setPhase(data.phase as string);
            }
        }
        if (searchParams.get("pid")) {
            getPaymentDetails();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payment/confirm${phase === "design" ? "/design" : ""}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('token')}`
                },
                body: JSON.stringify({ paymentId: searchParams.get("pid") })
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false);
                toast({
                    title: "Payment Successful",
                });
                router.push(`/customer/thank-you?id=${data.paymentId}`);
            } else {
                setLoading(false);
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive"
                });
            }
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            });
            console.error(error);
        }
    };

    return (
        <section className={`${loading && 'overflow-hidden'} min-h-screen max-w-screen-xl mx-auto w-full`}>
            {
                loading && (
                    <div className="absolute bg-black bg-opacity-50 inset-0 z-[100]">
                        <div className="flex justify-center items-center h-full">
                            <AiOutlineLoading3Quarters className="text-5xl text-white animate-spin" />
                        </div>
                    </div>
                )
            }

            <div className="relative">
                <div className="border rounded-lg p-7 md:p-14">
                    <div className="text-center ">
                        <h3 className="text-3xl font-bold">Payment Method</h3>
                        <p className="text-xs mt-4 text-gray-500">
                            Select your payment method and enter your payment information.
                        </p>
                    </div>

                    <Button variant={"secondary"} className={cn('top-12 right-8 flex absolute')} onClick={() => { router.back() }}>back</Button>

                    {/* Cards */}

                    <div className="flex flex-col md:!flex-row justify-between py-8">
                        <div className="w-full md:w-3/5 p-4">
                            <div className="w-3/5 flex">
                                <div className="flex justify-center items-center content-center text-sm border py-4 px-3 hover:border-blue-600 bg-gray-200">
                                    <BsCreditCard2Back className="hover:text-blue-600" />
                                    <p className="ml-1 text-xs">Net Banking</p>
                                </div>
                                <div className="flex justify-center items-center content-center text-sm border border-blue-600 py-4 px-3 hover:border-blue-600">
                                    <BsCreditCard2Back className="hover:text-blue-600" />
                                    <p className="ml-1 text-xs">Credit/Debit Card</p>
                                </div>
                                <div className="flex justify-center items-center content-center text-sm border py-4 px-3 hover:border-blue-600 bg-gray-200">
                                    <BsCreditCard2Back className="hover:text-blue-600" />
                                    <p className="ml-1 text-xs">Net Banking</p>
                                </div>
                            </div>

                            {/* Card INPUT */}
                            <div className="bg-white rounded-lg mt-5 p-2">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="cardNumber"
                                            className="block text-sm font-semibold mb-2"
                                        >
                                            Card Number
                                        </label>
                                        <label
                                            htmlFor="cardNumber"
                                            className="block text-xs mb-2"
                                        >
                                            Enter the 16- digit card number
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="w-full border rounded-lg p-2"
                                            required
                                            maxLength={16}
                                            minLength={16}
                                            pattern="[0-9]{16}"
                                            inputMode="numeric"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="cardHolderName"
                                            className="block text-sm font-semibold mb-2"
                                        >
                                            Card Holder Name
                                        </label>
                                        <label
                                            htmlFor="cardHolderName"
                                            className="block text-xs  mb-2"
                                        >
                                            Enter Card holder name
                                        </label>
                                        <input
                                            type="text"
                                            id="cardHolderName"
                                            placeholder="Enter Card holder name"
                                            value={cardHolderName}
                                            onChange={(e) => setCardHolderName(e.target.value)}
                                            className="w-full border rounded-lg p-2"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4 flex justify-between mt-6 ">
                                        <div>
                                            <label
                                                htmlFor="cvvNumber"
                                                className="block text-sm font-semibold mb-2"
                                            >
                                                CVV Number
                                            </label>
                                            <label
                                                htmlFor="cvvNumber"
                                                className="block text-xs  mb-2"
                                            >
                                                Enter the 4-digit number
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="cvvNumber"
                                            placeholder=""
                                            value={cvvNumber}
                                            onChange={(e) => setCvvNumber(e.target.value)}
                                            className="border rounded-lg p-1"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4 flex justify-between mt-6">
                                        <div className="max-w-[13rem] sm:!max-w-[auto]">
                                            <label
                                                htmlFor="expiryDate"
                                                className="block text-sm font-semibold mb-2"
                                            >
                                                Expiry Date
                                            </label>
                                            <label
                                                htmlFor="expiryDate"
                                                className="block text-xs mb-2"
                                            >
                                                Enter the Expiration date of the card
                                            </label>
                                        </div>
                                        <div className="flex flex-row items-center ml-4 gap-1">
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                placeholder=""
                                                value={expiryDate.month}
                                                onChange={(e) => setExpiryDate(prev => ({ ...prev, month: e.target.value }))}
                                                className="w-14 sm:w-20 border rounded-lg p-2"
                                                required
                                            />
                                            {` / `}
                                            <input
                                                type="text"
                                                id="expiryDate"
                                                placeholder=""
                                                value={expiryDate.year}
                                                onChange={(e) => setExpiryDate(prev => ({ ...prev, year: e.target.value }))}
                                                className="w-14 sm:w-20 border rounded-lg p-2"
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="text-center">
                                        <button className="w-1/2 m-auto text-white mt-4 bg-[#000325] text-xs rounded-full py-4">
                                            Confirm & Pay
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* card design */}
                        <div className="w-full md:w-2/5 p-4   flex flex-col justify-end">
                            <div className="w-[90%] md:w-[60%] bg-white p-4 md:p-8 m-auto flex flex-col shadow-md md:-mb-20 opacity-90 rounded-md">
                                <div className="p-2 flex justify-between">
                                    <Image src="/assets/pngwing.svg" alt="pngwing" width="40" height="40" />
                                    <Image src="/assets/contactless.svg" alt="contactless" width="40" height="40" />
                                </div>
                                <div className="text-center mt-7 font-semibold flex flex-col justify-center">
                                    <p>Card Holder name</p>
                                    <p className="mt-2"><label className="-mt-2">.... .... .... </label>3333</p>
                                </div>
                                <div className="mt-7 p-2 flex justify-between">
                                    <p>9/12</p>
                                    <div>
                                        <Image src="/assets/visa.svg" alt="visa" width="40" height="40" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-[95%] md:w-[70%] m-auto h-[80%]  bg-[#7fb9cc] flex flex-col justify-end">
                                <p className="text-center font-semibold mb-4">Amount to pay</p>
                                <div className="py-4 px-5 border border-dashed border-t-2 flex justify-between w-full">
                                    <p className="text-center text-lg font-semibold text-blue-700 mx-auto">INR {amount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};