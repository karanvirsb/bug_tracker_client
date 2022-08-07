import { AxiosError } from "axios";
import { motion } from "framer-motion";
import React from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { resetModal } from "../../../Redux/Slices/modalSlice";

type props = {
    ticketId: string;
};
const DeleteTicketModal = ({ ticketId }: props) => {
    const dispatch = useAppDispatch();
    const tickets = useAppSelector((state) => state.tickets.tickets);
    const ticket = tickets.find((ticket) => ticket.ticketId === ticketId);

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

    const modalConstraints = {
        hidden: { opacity: 0, y: 100, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: {
            scale: 0.2,
            transition: { duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    const deleteTicketMutation = useMutation(async (id: string) => {
        return axiosPrivate("/ticket", {
            method: "delete",
            data: { ticketId: id },
        });
    });

    const closeDeleteModal = () => {
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            deleteTicketMutation.mutateAsync(ticketId, {
                onSuccess: () => {
                    socket.emit("invalidateQuery", {
                        queryName: "projectTickets",
                        groupId: ticket?.projectId,
                    });
                    dispatch(resetModal());
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        const errorResp = JSON.parse(
                            error.response?.data.message
                        );
                        errorResp.forEach(
                            (elem: {
                                code: string;
                                inclusive: boolean;
                                message: string;
                                minimum?: number;
                                maxiumum?: number;
                                path: string[];
                                type: string;
                            }) => {
                                toast.error(elem.path[0] + " " + elem.message);
                            }
                        );
                    }
                },
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(JSON.parse(error.response?.data.message));
                toast.error(JSON.parse(error.response?.data.message));
            }
        }
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
                    Are you sure you want to delete this ticket?
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

export default DeleteTicketModal;
