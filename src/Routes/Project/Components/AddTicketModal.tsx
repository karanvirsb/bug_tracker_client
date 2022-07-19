import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import TicketModal from "./TicketModal";
import { ITicket } from "./TicketModal";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { useMutation } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { resetModal } from "../../../Redux/Slices/modalSlice";

const AddTicketModal = () => {
    const [ticketInput, setTicketInput] = useState<ITicket>({
        title: "",
        description: "",
        assignedDev: [],
        time: 0,
        ticketStatus: "",
        ticketSeverity: "",
        ticketType: "",
        reporterId: "",
        projectId: "",
    });

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const projectUsers = useAppSelector((state) => state.project.users);
    const groupUsers = useAppSelector((state) => state.group.users);
    const usersSelected = useRef(null);
    const ticketStatusRef = useRef(null);
    const ticketSeverityRef = useRef(null);
    const ticketTypeRef = useRef(null);
    const dispatch = useAppDispatch();

    const addTicketMutation = useMutation((ticketInfo: ITicket) => {
        return axiosPrivate("/ticket", {
            method: "post",
            data: ticketInfo,
        });
    });

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const ticketModalConstraints = {
        hidden: { opacity: 0, x: 1000, transition },
        visible: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 1000, transition: { duration: 1 } },
    };

    // creating the users of the group
    const users = [];

    for (let i = 0; i < projectUsers.length; i++) {
        const user = groupUsers.find(
            (user) => user.username === projectUsers[i]
        );

        users.push({
            value: user?.username,
            label: `${user?.firstName} ${user?.lastName}`,
        });
    }

    const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const closeModal = () => {
        dispatch(resetModal());
    };

    return (
        <motion.div
            className='bg-white min-h-[100vh] w-1/3 lg:w-3/6 md:w-3/4 sm:w-full fixed right-0'
            variants={ticketModalConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form
                action=''
                onSubmit={handleTicketSubmit}
                className='flex flex-col justify-evenly gap-3 w-full min-h-[100vh] p-4 '
            >
                <TicketModal
                    ticketInput={ticketInput}
                    setTicketInput={setTicketInput}
                    options={users}
                    userRef={usersSelected}
                    ticketSeverityRef={ticketSeverityRef}
                    ticketStatusRef={ticketStatusRef}
                    ticketTypeRef={ticketTypeRef}
                ></TicketModal>
                <div className='flex justify-center items-center gap-2 md:flex-col md:items-stretch md:px-20 sm:px-0'>
                    <button type='submit' className='btn bg-blue-500 !px-8'>
                        Submit
                    </button>
                    <button
                        type='button'
                        className='btn bg-red-500 !px-6'
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddTicketModal;
