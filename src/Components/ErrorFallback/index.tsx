import React from "react";

type props = {
    error: any;
    resetErrorBoundary?: any;
    text: string;
};
const ErrorFallback = ({ error, resetErrorBoundary, text }: props) => {
    return (
        <>
            <p className='my-3 text-xl'>{text}</p>
            {resetErrorBoundary && (
                <button
                    className='btn bg-gray-300 mb-5'
                    onClick={resetErrorBoundary}
                >
                    try again
                </button>
            )}
        </>
    );
};

export default ErrorFallback;
