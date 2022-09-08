import { motion } from "framer-motion";
import React from "react";

type props = { error: any; resetErrorBoundary: any };
const ErrorModal = ({ error, resetErrorBoundary }: props) => {
    return (
        <motion.div className='bg-white flex flex-col gap-4 p-4 rounded-md z-50'>
            <div className='font-semibold flex gap-4 items-center text-red-500 w-full'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                    />
                </svg>

                <p className='sm:text-xl text-lg text-center'>
                    Could not load modal
                </p>
            </div>
            <div className='flex gap-4 items-center w-full justify-center'>
                <button className='btn bg-cta-btn-color text-white hover:bg-transparent hover:text-cta-btn-color hover:outline hover:outline-[1px] hover:outline-cta-btn-color'>
                    Retry
                </button>
                <button className='btn outline outline-[1px] outline-gray-600 text-gray-600 hover:text-black'>
                    Close
                </button>
            </div>
        </motion.div>
    );
};

export default ErrorModal;
