import { Button } from '@/components/ui/button';
import { IoClose } from 'react-icons/io5';

const PopupComponent = ({ isVisible, togglePopup, sendMessage }: { isVisible: boolean, togglePopup: () => void, sendMessage: () => void }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4">
                <div className='flex flex-col h-full'>
                    <h1 className='px-4 py-2 bg-primary font-semibold justify-center uppercase text-lg text-white'>CONNECT WITH TEAM</h1>
                </div>
                <IoClose className="cursor-pointer text-lg absolute top-0 right-0 m-4" onClick={togglePopup} />
                <div className="px-3 py-4">
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        Message:
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Hi, I wanted to make a query about the remodelling design."
                    ></textarea>
                    <div className='flex gap-4 items-center justify-center w-full col-span-full mt-2 mb-4'>
                        <Button variant={'outline'} onClick={togglePopup} className='border-2 border-primary text-primary hover:text-primary'>
                            CANCEL
                        </Button>
                        <Button onClick={sendMessage} className='w-[100px]'>SEND</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupComponent;
