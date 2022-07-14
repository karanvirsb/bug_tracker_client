import React from "react";
const ErrorFallback = (props: { error: any; resetErrorBoundary: any }) => {
    return (
        <>
            <tr className='w-full text-center text-lg '>
                <td colSpan={1000}>
                    <p className='my-3 text-xl'>Could Not Fetch Projects!</p>
                    <button
                        className='btn bg-gray-300 mb-5'
                        onClick={props.resetErrorBoundary}
                    >
                        try again
                    </button>
                </td>
            </tr>
        </>
    );
};

export default ErrorFallback;
