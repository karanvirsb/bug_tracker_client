import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import Backdrop from "../../../Components/Backdrop";
import { setModal } from "../../../Redux/Slices/modalSlice";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../../../Hooks/useIsAdmin";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};
const MemberInfoModal = ({ selectedId, setSelectedId }: props) => {
    const dispatch = useAppDispatch();

    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const user = groupUsers.find((user) => user.username === selectedId);

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

    const memberInfoConstraint = {
        hidden: { opacity: 0, y: 100, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: 100, transition },
    };

    const openEditModal = () => {
        dispatch(
            setModal({
                type: "editMember",
                open: true,
                options: { username: user?.username },
            })
        );
        setSelectedId(null);
    };

    const openDeleteModal = () => {
        dispatch(
            setModal({
                type: "",
                open: true,
                options: {},
            })
        );
        setSelectedId(null);
    };

    return (
        <Backdrop onClick={() => setSelectedId(null)}>
            <motion.div
                className='bg-white flex flex-col flex-1 justify-between p-4 max-w-[400px] w-full  max-h-[600px] min-h-max-content rounded-md'
                variants={memberInfoConstraint}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => e.stopPropagation()} // stop from bubbling up to the backdrop and closing
            >
                <div className='border-b-[1px] border-black flex justify-between items-center pb-4'>
                    <div className='flex items-center gap-3'>
                        <img
                            className='w-[35px] h-[35px]'
                            src={`data:${
                                user?.avatar.contentType
                            };utf8,${encodeURIComponent(user?.avatar.data)}`}
                            alt={`${user?.username} avatar`}
                        />
                        <div>
                            <h1 className='text-2xl'>
                                {user?.firstName + " " + user?.lastName}
                            </h1>
                            <p className='text-gray-600'>
                                {`@${user?.username}`}
                            </p>
                        </div>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-9 w-9 fill-gray-600 cursor-pointer hover:fill-red-400 hover:text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        onClick={() => setSelectedId(null)}
                    >
                        <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
                <div>
                    <h2 className='text-gray-500 text-lg'>Email</h2>
                    <p className='max-w-[100ch] w-full text-lg max-h-[100px] overflow-auto outline outline-gray-200 outline-1 rounded-md p-4'>
                        {user?.email}
                    </p>
                </div>
                <div>
                    <h2 className='text-gray-500 text-lg'>IsAdmin:</h2>
                    <span>{user?.isAdmin ? "Yes" : "No"}</span>
                </div>
                <div>
                    <h2 className='text-gray-500 text-lg'>IsEditor:</h2>
                    <span>{user?.isEditor ? "Yes" : "No"}</span>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-1 justify-self-end'>
                    <button
                        className='btn bg-green-400'
                        onClick={openEditModal}
                    >
                        Edit User
                    </button>
                    <button
                        className='btn bg-red-400'
                        onClick={openDeleteModal}
                    >
                        Remove From Group
                    </button>
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default MemberInfoModal;
