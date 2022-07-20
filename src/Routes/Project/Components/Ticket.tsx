import React from "react";
import Members from "../../../Components/Members";
import { useAppSelector } from "../../../Hooks/hooks";
import { ITicket } from "./Tickets";

type reportProps = {
    username: string;
};

interface Ticket extends ITicket {
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Ticket = ({
    ticketId,
    dateCreated,
    title,
    assignedDev,
    ticketStatus,
    ticketSeverity,
    ticketType,
    reporterId,
    setSelectedId,
}: Ticket) => {
    return (
        <tr
            className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
            onClick={() => setSelectedId(ticketId)}
        >
            <th
                scope='row'
                className='px-6 py-3 text-gray-800 font-semibold sm:text-center'
            >
                {title}
            </th>
            <td className='px-6 py-3 lg:hidden'>
                <Reporter username={reporterId}></Reporter>
            </td>
            <td className='px-6 py-3 lg:hidden'>
                {dateCreated.toDateString()}
            </td>
            <td className='px-6 py-3 md:hidden'>{ticketType}</td>
            <td className='px-6 py-3 sm:hidden'>{ticketStatus}</td>
            <td className='px-6 py-3 lg:hidden'>
                <Members usersArr={assignedDev}></Members>
            </td>
            <td className='px-6 py-3 sm:hidden'>{ticketSeverity}</td>
        </tr>
    );
};

const Reporter = ({ username }: reportProps) => {
    const groupData = useAppSelector((state) => state.persistedReducer.group);
    const foundUser = groupData.users.find(
        (user) => user.username === username
    );
    return (
        <>
            {foundUser?.firstName +
                " " +
                foundUser?.lastName.substring(0, 1) +
                "."}
        </>
    );
};

export default Ticket;
