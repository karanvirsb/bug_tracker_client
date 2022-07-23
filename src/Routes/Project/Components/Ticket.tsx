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

type colorObj = {
    [key: string]: string;
};

export const ticketStatusColor: colorObj = {
    Open: "bg-[#B6DBF0]",
    Todo: "bg-[#C2F0B6]",
    "In Progress": "bg-[#F0D5B6]",
    "To Be Tested": "bg-[#CCB6F0]",
    Closed: "bg-[#F0B6EE]",
};

export const ticketSeverityColor: colorObj = {
    Critical: "bg-[#F18989]",
    High: "bg-[#E5AC80]",
    Medium: "bg-[#E5DC80]",
    Low: "bg-[#80E5AA]",
};

export const ticketTypeColor: colorObj = {
    Bug: "outline outline-[#CCB6F0]",
    Feature: "outline outline-[#B6DBF0]",
    Error: "outline outline-[#F18989]",
    Issue: "outline outline-[#E5DC80]",
};

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
            <td className='px-6 py-3 md:hidden'>
                <p
                    className={`${ticketTypeColor[ticketType]} text-center rounded-xl`}
                >
                    {ticketType}
                </p>
            </td>
            <td className={`px-6 py-3 sm:hidden`}>
                <p
                    className={`${ticketStatusColor[ticketStatus]} text-center rounded-xl`}
                >
                    {ticketStatus}
                </p>
            </td>
            <td className='px-6 py-3 lg:hidden'>
                <Members usersArr={assignedDev}></Members>
            </td>
            <td className='px-6 py-3 sm:hidden'>
                <p
                    className={`${ticketSeverityColor[ticketSeverity]} text-center`}
                >
                    {ticketSeverity}
                </p>
            </td>
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
