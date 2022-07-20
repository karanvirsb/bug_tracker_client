import { motion } from "framer-motion";
import React from "react";
import Backdrop from "../../../Components/Backdrop";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setModal } from "../../../Redux/Slices/modalSlice";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const TicketInfoModal = ({ selectedId, setSelectedId }: props) => {
    const dispatch = useAppDispatch();
    const tickets = useAppSelector((state) => state.tickets.tickets);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const ticket = tickets.find((ticket) => ticket.ticketId === selectedId);
    const user = groupUsers.find(
        (user) => user.username === ticket?.reporterId
    );

    const openEditModal = () => {
        dispatch(
            setModal({
                type: "updateTicket",
                open: true,
                options: { ticketId: ticket?.ticketId },
            })
        );
        setSelectedId(null);
    };

    const openDeleteModal = () => {
        dispatch(
            setModal({
                type: "deleteTicket",
                open: true,
                options: { ticketId: ticket?.ticketId },
            })
        );
        setSelectedId(null);
    };

    return (
        <Backdrop>
            <motion.div className='bg-white flex flex-col gap-4 fixed bottom-0 left-0 right-0 p-4 max-w-[1920px] w-full max-h-[75%] h-full overflow-auto rounded-md'>
                <div className='flex justify-between items-center'>
                    <div className='flex lg:flex-col gap-4 items-center'>
                        <div className='flex gap-4 sm:flex-col m-md:items-center sm:w-full'>
                            <h1 className='text-2xl'>{ticket?.title}</h1>
                            <span className='sm:hidden'>&#8212;</span>
                            <span className='text-gray-600 m-md:pl-2'>
                                {new Date(
                                    ticket?.dateCreated ?? ""
                                ).toDateString()}
                            </span>
                        </div>
                        <span className='hidden m-lg:inline-block'>
                            &#8212;
                        </span>
                        <div className='flex gap-4 sm:flex-col m-md:items-center sm:w-full '>
                            <div className='flex gap-4 items-center'>
                                <span>{ticket?.ticketType}</span> |
                                <span>{ticket?.ticketStatus}</span> |
                                <span>{ticket?.ticketSeverity}</span>
                            </div>
                            <span className='sm:hidden'>&#8212;</span>
                            <div>
                                By: {user?.firstName + " " + user?.lastName}
                            </div>
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
                <div className='flex gap-2 pb-4'>
                    <button
                        className='btn bg-green-400'
                        onClick={openEditModal}
                    >
                        Edit
                    </button>
                    <button
                        className='btn bg-red-400'
                        onClick={openDeleteModal}
                    >
                        Delete
                    </button>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-1'>
                    <div>
                        <h2 className='text-gray-500 text-lg'>Description:</h2>
                        <p className='max-w-[100ch] w-full text-lg max-h-[100px] overflow-auto pl-4 outline outline-gray-200 outline-1 rounded-md p-4'>
                            {ticket?.description}
                        </p>
                    </div>
                    <div>
                        <h2 className='text-gray-500 text-lg'>Users:</h2>
                        <UserElements
                            usersArr={ticket?.assignedDev ?? []}
                        ></UserElements>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center mt-4'>
                    <button className='btn hover:!outline-none hover:!text-blue-500'>
                        Load Comments
                    </button>
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
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    return (
        <ul className='max-w-[100ch] max-h-[100px] overflow-auto overflow-x-hidden outline outline-gray-200 outline-1 rounded-md p-4'>
            {users.map((user) => {
                return (
                    <li
                        key={user.username}
                        className='pl-4 text-lg border-b border-b-gray-200 border-1 w-full'
                    >{`${user.firstName} ${user.lastName}`}</li>
                );
            })}
        </ul>
    );
};

export default TicketInfoModal;
