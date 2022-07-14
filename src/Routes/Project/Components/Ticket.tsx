import React from "react";
import Members from "../../../Components/Members";
import { useAppSelector } from "../../../Hooks/hooks";
import { ITicket } from "./Tickets";

type reportProps = {
    username: string;
};

const Ticket = ({
    ticketId,
    dateCreated,
    title,
    description,
    assignedDev,
    time,
    ticketStatus,
    ticketSeverity,
    ticketType,
    reporterId,
    projectId,
}: ITicket) => {
    return (
        <tr className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'>
            <th scope='row' className='px-6 py-3 text-gray-800 font-semibold'>
                {title}
            </th>
            <td className='px-6 py-3'>
                <Reporter username={reporterId}></Reporter>
            </td>
            <td className='px-6 py-3'>{dateCreated.toDateString()}</td>
            <td className='px-6 py-3'>{ticketType}</td>
            <td className='px-6 py-3'>{ticketStatus}</td>
            <td className='px-6 py-3'>
                <Members usersArr={assignedDev}></Members>
            </td>
            <td className='px-6 py-3'>{ticketSeverity}</td>
        </tr>
    );
};

const Reporter = ({ username }: reportProps) => {
    const groupData = useAppSelector((state) => state.group);
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
