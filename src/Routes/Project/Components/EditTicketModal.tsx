import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import TicketModal from "./TicketModal";
import { ITicket } from "./TicketModal";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { useMutation } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { resetModal } from "../../../Redux/Slices/modalSlice";
import socket from "../../../API/sockets";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const initalState = {
    title: "",
    description: "",
    assignedDev: [],
    time: 0,
    ticketStatus: "",
    ticketSeverity: "",
    ticketType: "",
    reporterId: "",
    projectId: "",
};

type props = {
    ticketId: string;
};

interface mutationTicket {
    ticketId: string;
    updates: ITicket;
}

const EditTicketModal = ({ ticketId }: props) => {
    const tickets = useAppSelector((state) => state.tickets.tickets);
    const ticket = tickets.find((ticket) => ticket.ticketId === ticketId);

    const [ticketInput, setTicketInput] = useState<ITicket>({
        ...initalState,
        ...ticket,
    });

    const authState = useAppSelector((state) => state.persistedReducer.auth);
    const projectState = useAppSelector((state) => state.project);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const usersSelected = useRef(null);
    const ticketStatusRef = useRef(null);
    const ticketSeverityRef = useRef(null);
    const ticketTypeRef = useRef(null);
    const dispatch = useAppDispatch();

    const updateTicketMutation = useMutation(
        ({ ticketId, updates }: mutationTicket) => {
            return axiosPrivate("/ticket", {
                method: "put",
                data: { ticketId, updates },
            });
        }
    );

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const ticketModalConstraints = {
        hidden: { opacity: 0, x: 1000, transition },
        visible: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 1000, transition: { duration: 1 } },
    };

    // creating the users of the group
    const users = [];
    const defaultSelectedUser = [];

    for (let i = 0; i < projectState.users.length; i++) {
        const user = groupUsers.find(
            (user) => user.username === projectState.users[i]
        );

        users.push({
            value: user?.username,
            label: `${user?.firstName} ${user?.lastName}`,
        });

        if (ticket?.assignedDev.includes(projectState.users[i])) {
            defaultSelectedUser.push({
                value: user?.username ?? "",
                label: `${user?.firstName} ${user?.lastName}`,
            });
        }
    }

    // Assigning default values
    const ticketTypeDefault = {
        value: ticket?.ticketType,
        label: ticket?.ticketType,
    };

    const ticketStatusDefault = {
        value: ticket?.ticketStatus,
        label: ticket?.ticketStatus,
    };

    const ticketSeverityDefault = {
        value: ticket?.ticketSeverity,
        label: ticket?.ticketSeverity,
    };

    const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        type user = {
            value: string;
            label: string;
        };

        e.preventDefault();

        let newTicket = {
            title: ticketInput.title,
            description: ticketInput.description,
            assignedDev: [],
            time: ticketInput.time,
            ticketStatus: "",
            ticketSeverity: "",
            ticketType: "",
            reporterId: ticketInput.reporterId,
            projectId: ticketInput.projectId,
            ticketId: ticketInput.ticketId,
        };

        if (ticketSeverityRef.current) {
            newTicket = {
                ...newTicket,
                ticketSeverity: (ticketSeverityRef?.current as any).state
                    .selectValue[0].value,
            };
        }

        if (ticketStatusRef.current) {
            newTicket = {
                ...newTicket,
                ticketStatus: (ticketStatusRef?.current as any).state
                    .selectValue[0].value,
            };
        }

        if (ticketTypeRef.current) {
            newTicket = {
                ...newTicket,
                ticketType: (ticketTypeRef?.current as any).state.selectValue[0]
                    .value,
            };
        }

        if (usersSelected.current) {
            const selectedUsers =
                (usersSelected?.current as any).state?.selectValue.map(
                    (user: user) => {
                        return user.value;
                    }
                ) ?? [];

            newTicket = {
                ...newTicket,
                assignedDev: selectedUsers,
            };
        }

        newTicket = {
            ...newTicket,
            projectId: projectState.projectId,
            reporterId: authState?.username ?? "",
        };

        console.log(newTicket);
        try {
            updateTicketMutation.mutateAsync(
                { ticketId: ticketId, updates: newTicket },
                {
                    onSuccess: () => {
                        setTicketInput(initalState);

                        socket.emit("invalidateQuery", {
                            queryName: "projectTickets",
                            groupId: projectState.projectId,
                        });

                        //reset modal
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
                                    toast.error(
                                        elem.path[0] + " " + elem.message
                                    );
                                }
                            );
                        }
                    },
                }
            );
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(JSON.parse(error.response?.data.message));
                toast.error(JSON.parse(error.response?.data.message));
            }
            console.log(error);
        }
    };

    const closeModal = () => {
        dispatch(resetModal());
    };

    return (
        <motion.div
            className='bg-white min-h-[100vh] w-1/3 lg:w-3/6 md:w-3/4 sm:w-full fixed right-0 top-0 bottom-0 overflow-auto'
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
                    defaultSelect={defaultSelectedUser}
                    defaultTicketSeverity={ticketSeverityDefault}
                    defaultTicketStatus={ticketStatusDefault}
                    defaultTicketType={ticketTypeDefault}
                    type='edit'
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

export default EditTicketModal;
