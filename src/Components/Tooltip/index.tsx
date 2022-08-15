import React from "react";

type Props = {
    id: string;
    toolTipText: string;
};

function ToolTip({ id, toolTipText }: Props): JSX.Element {
    return (
        <p
            id={`${id}`}
            className='bg-gray-800 text-white p-2 rounded-md flex items-center gap-3 w-full'
            aria-hidden='false'
            tabIndex={0}
            aria-live='assertive'
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 self-start'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
            </svg>
            <span className='text-left w-3/4'>{toolTipText}</span>
        </p>
    );
}

export default ToolTip;
