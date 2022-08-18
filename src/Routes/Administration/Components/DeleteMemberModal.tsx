import React from "react";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { resetModal } from "../../../Redux/Slices/modalSlice";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";

type props = {
    username: string;
};

type deleteMemberMutationType = {
    username: string;
    groupId: string;
};

const DeleteMemberModal = ({ username }: props) => {
    const dispatch = useAppDispatch();
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

    const deleteMemberMutation = useMutation(
        async ({ username, groupId }: deleteMemberMutationType) => {
            const resp = await axiosPrivate("/user/group", {
                method: "delete",
                data: { username: username, groupId: groupId },
            });
            return resp.data;
        }
    );

    const closeDeleteModal = () => {
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        deleteMemberMutation.mutateAsync(
            { username: username, groupId: group.groupId },
            {
                onSuccess: () => {
                    socket.emit("removedUserFromGroup", {
                        username: username,
                        roomId: group.groupId,
                    });

                    toast.success(`Successfully removed @${username}`);

                    dispatch(resetModal());

                    // invalidate the group info
                    socket.emit("invalidateQuery", {
                        queryName: "groupInfo",
                        groupId: group.groupId,
                    });

                    // invalidate group users to refresh them
                    socket.emit("invalidateQuery", {
                        queryName: "groupUsers",
                        groupId: group.groupId,
                    });
                },
            }
        );
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
                    {`Are you sure you want to kick ${username} user?`}
                </p>
                <div className='flex gap-2 sm:w-full sm:flex-col sm:items-stretch sm:px-16'>
                    <button className='btn bg-blue-400 !px-6' type='submit'>
                        Yes
                    </button>
                    <button
                        className='btn bg-red-400 !px-6'
                        onClick={closeDeleteModal}
                        type='button'
                    >
                        No
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default DeleteMemberModal;
