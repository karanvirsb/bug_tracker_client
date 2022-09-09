import React, { lazy, Suspense } from "react";
import Spinner from "../../../Components/Spinner";
const Members = lazy(() => import("../../../Components/Members"));
import { useAppSelector } from "../../../Hooks/hooks";
import { ITicket } from "./UserTickets";
import {
    ticketStatusColor,
    ticketSeverityColor,
    ticketTypeColor,
} from "../../Project/Components/Ticket";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackWithoutRetry from "../../../Components/ErrorFallback/ErrorFallbackWithoutRetry";

type reportProps = {
    username: string;
};

interface UserTicketInterface extends ITicket {
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

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
        <tr className='table_row_hover' onClick={() => setSelectedId(ticketId)}>
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
                <ErrorBoundary
                    fallback={
                        <ErrorFallbackWithoutRetry text='Error: Could not load members'></ErrorFallbackWithoutRetry>
                    }
                >
                    <Suspense
                        fallback={
                            <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                <Spinner></Spinner>
                            </div>
                        }
                    >
                        <Members usersArr={assignedDev}></Members>
                    </Suspense>
                </ErrorBoundary>
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

export default UserTicket;
