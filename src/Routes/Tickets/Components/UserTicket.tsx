import React, { lazy, Suspense } from "react";
import Spinner from "../../../Components/Spinner";
const Members = lazy(() => import("../../../Components/Members"));
import { useAppSelector } from "../../../Hooks/hooks";
import { ITicket } from "./UserTickets";

type reportProps = {
    username: string;
};

interface UserTicketInterface extends ITicket {
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
    Issue: "outlien outline-[#E5DC80]",
};

const UserTicket = ({
    ticketId,
    dateCreated,
    title,
    assignedDev,
    ticketStatus,
    ticketSeverity,
    ticketType,
    reporterId,
    setSelectedId,
}: UserTicketInterface) => {
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
                <Suspense
                    fallback={
                        <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    <Members usersArr={assignedDev}></Members>
                </Suspense>
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

export default UserTicket;
