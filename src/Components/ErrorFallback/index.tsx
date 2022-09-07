import React from "react";

type props = {
    error: any;
    resetErrorBoundary?: any;
    text: string;
};
const ErrorFallback = ({ error, resetErrorBoundary, text }: props) => {
    return (
        <>
            <tr className='w-full text-center text-lg '>
                <td colSpan={1000}>
                    <p className='my-3 text-xl'>{text}</p>
                    {resetErrorBoundary && (
                        <button
                            className='btn bg-gray-300 mb-5'
                            onClick={resetErrorBoundary}
                        >
                            try again
                        </button>
                    )}
                </td>
            </tr>
        </>
    );
};

export default ErrorFallback;
