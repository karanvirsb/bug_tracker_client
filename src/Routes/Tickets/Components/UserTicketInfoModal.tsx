import { motion } from "framer-motion";
import React from "react";
import Backdrop from "../../../Components/Backdrop";
import { useAppSelector } from "../../../Hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
    ticketStatusColor,
    ticketSeverityColor,
    ticketTypeColor,
} from "../../Project/Components/Ticket";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserTicketInfoModal = ({ selectedId, setSelectedId }: props) => {
    const navigate = useNavigate();
    const tickets = useAppSelector((state) => state.tickets.tickets);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const foundTicket = tickets?.find(
        (ticket) => ticket.ticketId === selectedId
    );
    const foundUser = groupUsers?.find(
        (user) => user.username === foundTicket?.reporterId
    );

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const ticketModalConstraints = {
        hidden: { opacity: 0, y: 1000, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: 1000, transition: { duration: 1 } },
    };

    const goToTicketsPage = () => {
        navigate(
            `/project/${foundTicket?.projectId}?ticketId=${foundTicket?.ticketId}`,
            { replace: false }
        );
    };

    return (
        <Backdrop>
            <motion.div
                className='bg-white flex flex-col gap-4 fixed bottom-0 left-0 right-0 max-w-[1920px] w-full top-[25%] overflow-auto rounded-md'
                variants={ticketModalConstraints}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-9 w-9 absolute top-[10px] right-[10px] z-20 fill-gray-600 cursor-pointer hover:fill-red-400 hover:text-black'
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

                <div className='bg-gray-100 flex lg:flex-col gap-4 w-full p-4'>
                    <div className='flex gap-4 sm:flex-col m-md:items-center sm:w-full'>
                        <h1 className='text-2xl'>{foundTicket?.title}</h1>
                        <span className='sm:hidden'>&#8212;</span>
                        <span className='text-gray-600 m-md:pl-2'>
                            {new Date(
                                foundTicket?.dateCreated ?? ""
                            ).toDateString()}
                        </span>
                    </div>
                    <span className='hidden m-lg:inline-block'>&#8212;</span>
                    <div className='flex gap-4 sm:flex-col m-md:items-center sm:w-full '>
                        <div className='flex gap-4 items-center'>
                            <span
                                className={`${
                                    ticketTypeColor[
                                        foundTicket?.ticketType ?? "Bug"
                                    ]
                                } text-center rounded-xl px-4`}
                            >
                                {foundTicket?.ticketType}
                            </span>{" "}
                            <span
                                className={`${
                                    ticketStatusColor[
                                        foundTicket?.ticketStatus ?? "Open"
                                    ]
                                } text-center rounded-xl px-4`}
                            >
                                {foundTicket?.ticketStatus}
                            </span>{" "}
                            <span
                                className={`${
                                    ticketSeverityColor[
                                        foundTicket?.ticketSeverity ?? "None"
                                    ]
                                } text-center px-4`}
                            >
                                {foundTicket?.ticketSeverity}
                            </span>
                        </div>
                        <span className='sm:hidden'>&#8212;</span>
                        <div>
                            By:{" "}
                            {foundUser?.firstName + " " + foundUser?.lastName}
                        </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-1 mb-6'>
                        <div>
                            <h2 className='text-gray-500 text-lg'>
                                Description:
                            </h2>
                            <p className='max-w-[100ch] w-full text-lg max-h-[150px] overflow-auto pl-4 outline outline-gray-200 outline-1 rounded-md p-4'>
                                {foundTicket?.description}
                            </p>
                        </div>
                        <div>
                            <h2 className='text-gray-500 text-lg'>Users:</h2>
                            <UserElements
                                usersArr={foundTicket?.assignedDev ?? []}
                            ></UserElements>
                        </div>
                    </div>
                    <div>
                        {/* TODO go to ticket */}
                        <button
                            className='btn bg-blue-400 hover:outline hover:outline-2 hover:outline-blue-400 mt-4 '
                            onClick={goToTicketsPage}
                        >
                            Go To Ticket
                        </button>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};

type userProps = {
    usersArr: string[];
};

const UserElements = ({ usersArr }: userProps) => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );

    const users = [];
    for (const user of groupUsers) {
        if (usersArr.includes(user.username)) {
            users.push(user);
        }
    }

    return (
        <ul className='max-w-max max-h-[100px] overflow-auto overflow-x-hidden outline outline-gray-200 outline-1 rounded-md p-4'>
            {users.map((user) => {
                return (
                    <li
                        key={user.username}
                        className='flex justify-center items-center text-xl bg-gray-200 mb-2 last:mb-0 py-1 px-4 rounded-3xl w-full'
                    >{`${user.firstName} ${user.lastName}`}</li>
                );
            })}
        </ul>
    );
};

export default UserTicketInfoModal;
