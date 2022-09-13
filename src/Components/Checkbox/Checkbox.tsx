import React, { useState } from "react";

type props = {
    text: string;
    id: string;
    name: string;
    defaultChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
    text = "click me",
    id,
    name,
    defaultChecked,
    onChange,
}: props) => {
    const [clicked, setClicked] = useState(defaultChecked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (e.target.checked) {
            setClicked(true);
        } else {
            setClicked(false);
        }
    };
    return (
        <div className='relative w-full'>
            <input
                type='checkbox'
                name={name}
                id={id}
                className='invisible absolute'
                onChange={handleChange}
                defaultChecked={defaultChecked}
            />
            <label
                htmlFor={id}
                className={`${
                    clicked
                        ? " font-semibold before:flex before:justify-center before:items-center before:bg-green-700 before:outline-none before:content-['\\2713'] before:text-xs before:text-green-500 shadow-md shadow-green-400"
                        : " before:outline before:outline-1 before:outline-black"
                } rounded-md w-[150px] h-[35px] md:w-full relative flex justify-center items-center outline outline-1 outline-gray-400 before:content before:block before:absolute before:top-[3px] before:right-[3px] before:w-[17px] before:h-[17px] before:rounded-full`}
            >
                {text}
            </label>
        </div>
    );
};

export default Checkbox;
