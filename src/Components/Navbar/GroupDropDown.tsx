import { useRef, useState, useEffect } from "react";

type dropDownProps = {
    inviteCode: string;
    componentRef: typeof useRef;
};

const GroupDropDown = ({ inviteCode, componentRef }: dropDownProps) => {
    const [copied, setCopied] = useState(false);
    const copyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => [setCopied(false)], 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [copied]);

    return (
        <div
            className='absolute bg-white text-black p-1 z-10 rounded-md w-full'
            ref={componentRef}
        >
            <p
                className='flex justify-center items-center border-b border-b-gray-300 cursor-pointer relative min-h-[50px] rounded hover:outline hover:outline-1 hover:outline-black'
                onClick={copyInviteCode}
            >
                {inviteCode}
                {copied && (
                    <span className='absolute translate-x-[0%] translate-y-[110%] bg-gray-600 text-white p-3 rounded-md'>
                        Copied
                    </span>
                )}
            </p>
            <button className='btn bg-secondary-color text-white !w-full !rounded-sm hover:text-black hover:outline hover:outline-2 hover:outline-black mt-2'>
                Leave Group
            </button>
        </div>
    );
};

export default GroupDropDown;
