import { motion } from "framer-motion";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import useLogout from "../../Hooks/useLogout";

const RemovedFromGroupModal = () => {
    const logout = useLogout();
    const group = useAppSelector((state) => state.persistedReducer.group);

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

    const modalConstraints = {
        hidden: { opacity: 0, y: 100, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: {
            scale: 0.2,
            transition: { duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        logout();
    };

    return (
        <motion.div
            className='flex justify-center items-center w-full h-full'
            variants={modalConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form
                action=''
                className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md w-1/4 max-w-[350px] min-w-[250px] sm:w-[90%] h-1/4 min-h-[200px] max-h-[250px]'
                onSubmit={handleSubmit}
            >
                <p className='text-center lg:text-xl m-md:text-lg'>
                    {`You have been removed from ${group.groupName}`}
                </p>
                <div className='flex gap-2 sm:w-full sm:flex-col sm:items-stretch sm:px-16'>
                    <button className='btn bg-blue-400 !px-6' type='submit'>
                        Ok
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default RemovedFromGroupModal;
