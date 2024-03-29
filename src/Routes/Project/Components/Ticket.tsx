import React, { useEffect, useState } from "react";
import Members from "../../../Components/Members";
import { useAppSelector } from "../../../Hooks/hooks";
import { ITicket } from "./Tickets";

type reportProps = {
    username: string;
};

interface TicketInterface extends ITicket {
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
    highlight: boolean;
}

type colorObj = {
    [key: string]: string;
};

export const ticketStatusColor: colorObj = {
    Open: " bg-[#B6DBF0] ",
    Todo: " bg-[#C2F0B6] ",
    "In Progress": " bg-[#F0D5B6] ",
    "To Be Tested": " bg-[#CCB6F0] ",
    Closed: " bg-[#F0B6EE] ",
};

export const ticketSeverityColor: colorObj = {
    Critical: " bg-[#F18989] ",
    High: " bg-[#E5AC80] ",
    Medium: " bg-[#E5DC80] ",
    Low: " bg-[#80E5AA] ",
};

export const ticketTypeColor: colorObj = {
    Bug: " outline outline-[#CCB6F0] ",
    Feature: " outline outline-[#B6DBF0] ",
    Error: " outline outline-[#F18989] ",
    Issue: " outline outline-[#E5DC80] ",
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
    highlight,
}: TicketInterface) => {
    const [highlighterClass, setHighlighterClass] = useState("");

    useEffect(() => {
        let timer: any;
        if (highlight === true) {
            setHighlighterClass("bg-gray-200 animate-pulse");
            timer = setTimeout(() => {
                setHighlighterClass("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [highlight]);

    return (
        <tr
            className={`table_row_hover ${highlighterClass}`}
            onClick={() => setSelectedId(ticketId)}
        >
            <th
                scope='row'
                className='table_padding table_row_header sm:text-center'
            >
                {title}
            </th>
            <td className='table_padding lg:hidden'>
                <Reporter username={reporterId}></Reporter>
            </td>
            <td className='table_padding lg:hidden'>
                {dateCreated.toDateString()}
            </td>
            <td className='table_padding md:hidden'>
                <p
                    className={`${ticketTypeColor[ticketType]} text-center rounded-xl`}
                >
                    {ticketType}
                </p>
            </td>
            <td className={`table_padding sm:hidden`}>
                <p
                    className={`${ticketStatusColor[ticketStatus]} text-center rounded-xl`}
                >
                    {ticketStatus}
                </p>
            </td>
            <td className='table_padding lg:hidden'>
                <Members usersArr={assignedDev}></Members>
            </td>
            <td className='table_padding sm:hidden'>
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
