import React, { useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
const TicketModal = lazy(() => import("./TicketModal"));
import { ITicket } from "./TicketModal";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { useMutation } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { resetModal } from "../../../Redux/Slices/modalSlice";
import socket from "../../../API/sockets";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../Components/Spinner";

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

const AddTicketModal = () => {
    const [ticketInput, setTicketInput] = useState<ITicket>(initalState);

    const authState = useAppSelector((state) => state.persistedReducer.auth);
    const projectState = useAppSelector((state) => state.project);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const usersSelected = useRef(null); // to fill in the react-select component with group users
    const ticketStatusRef = useRef(null); // to allow getting select value
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

    for (const user of projectState.users) {
        const foundUser = groupUsers.find(
            (groupUser) => groupUser.username === user
        );

        users.push({
            value: foundUser?.username,
            label: `${foundUser?.firstName} ${foundUser?.lastName}`,
        });
    }

    const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        type user = {
            value: string;
            label: string;
        };

        e.preventDefault();

        let newTicket = ticketInput;

        // if found add it to new ticket
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
            addTicketMutation.mutateAsync(newTicket, {
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
            console.log(error);
        }
    };

    const closeModal = () => {
        dispatch(resetModal());
    };

    return (
        <motion.div
            className='side-modal'
            variants={ticketModalConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form
                action=''
                onSubmit={handleTicketSubmit}
                className='side-modal-form'
            >
                <Suspense
                    fallback={
                        <div className='bg-white w-full rounded-lg flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
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
                    <div className='side-modal-btn-container'>
                        <button type='submit' className='btn submit-btn'>
                            Submit
                        </button>
                        <button
                            type='button'
                            className='btn cancel-btn'
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </Suspense>
            </form>
        </motion.div>
    );
};

export default AddTicketModal;
