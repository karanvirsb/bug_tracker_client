import React, { useState } from "react";

type States = {
    groupType: string;
};

const AddGroup = () => {
    const [group, setGroup] = useState<States["groupType"]>("");
    return (
        <section className='bg-main-color flex justify-center items-center p-4 w-full h-screen'>
            <div className='bg-white p-4 rounded-md flex flex-col gap-3'>
                <h1 className='md:text-2xl xl:text-3xl text-center'>
                    Join or Create a Group
                </h1>
                <input
                    type='text'
                    className='input'
                    placeholder='Invite / Group name'
                    onChange={(e) => setGroup(e.target.value)}
                    value={group}
                />
                <button className='bg-blue-500 text-white font-semibold hover:outline-blue-500 hover:text-black hover:outline-2 hover:outline hover:bg-transparent rounded-md mt-2 py-2 px-4 md:text-lg xl:text-xl text-center'>
                    Join
                </button>
                <button className='bg-secondary-color text-white font-semibold hover:outline-secondary-color hover:outline-2 hover:outline hover:bg-transparent hover:text-black rounded-md py-2 px-4 md:text-lg xl:text-xl text-center'>
                    Create
                </button>
            </div>
        </section>
    );
};

export default AddGroup;
