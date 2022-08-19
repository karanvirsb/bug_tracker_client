import React, { useState } from "react";

type props = {
    text: string;
};

const Checkbox = ({ text = "click me" }: props) => {
    const [clicked, setClicked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setClicked(true);
        } else {
            setClicked(false);
        }
    };
    return (
        <div className='relative'>
            <input
                type='checkbox'
                id='checkbox'
                className='invisible absolute'
                onChange={handleChange}
            />
            <label
                htmlFor='checkbox'
                className={`${
                    clicked
                        ? "bg-blue-400 outline-none before:bg-green-400 before:outline-none"
                        : ""
                } outline outline-1 outline-black rounded-md p-4 before:content-[] before:block before:absolute before:top-[3px] before:left-[3px] before:w-[15px] before:h-[15px] before:rounded-full before:outline before:outline-1 before:outline-black`}
            >
                {text}
            </label>
        </div>
    );
};

export default Checkbox;
