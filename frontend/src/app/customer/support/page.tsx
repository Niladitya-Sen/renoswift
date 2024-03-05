"use client"; 

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Support({ params: { requestId } }: Readonly<{ params: { requestId: string } }>) {
    // State to manage remarks field value
    const [remarks, setRemarks] = useState('');

    const handleCancel = () => {
        // Logic to handle cancellation
        setRemarks(''); // Clearing the remarks field
    };

    const handleSubmit = () => {
        // Logic to handle form submission
        console.log(remarks); // This is where you would typically send the data to a server
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center my-6">
            
                <h1 className="text-2xl font-bold text-gray-600">WELCOME TO OUR CUSTOMER CARE SUPPORT.</h1>
                <p className="text-gray-600">WE&apos;RE HERE TO ASSIST YOU WITH ANY QUESTIONS, CONCERNS, OR FEEDBACK YOU MAY HAVE.</p>
                <hr className="my-4" style={{ borderColor: 'grey' }} />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 w-full">
                  
                    <p className="font-semibold text-lg">Remarks</p>
                    <textarea
                        id="remarks"
                        name="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Type your remarks here..."
                        className="border p-4 rounded-md w-full"
                        rows={6} 
                        style={{ minHeight: '150px' }}
                    />
                </div>
                <div className="flex gap-4">
                    <Button variant={'outline'} onClick={handleCancel} className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                        CANCEL
                    </Button>
                    <Button onClick={handleSubmit} className="bg-primary text-white hover:bg-primary-dark">
                        SUBMIT
                    </Button>
                </div>
            </div>
        </div>
    );
}
