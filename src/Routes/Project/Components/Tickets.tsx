import React, { useState, lazy, Suspense } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import Ticket from "./Ticket";
import Spinner from "../../../Components/Spinner";
const TicketInfoModal = lazy(() => import("./TicketInfoModal"));
export interface ITicket {
    ticketId: string;
    dateCreated: Date;
    title: string;
    description: string;
    assignedDev: string[];
    time: number;
    ticketStatus: string;
    ticketSeverity: string;
    ticketType: string;
    reporterId: string;
    projectId: string;
}

export type props = {
    tickets: ITicket[];
    highlightTicket?: string;
};

const Tickets = ({ tickets, highlightTicket }: props) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return !tickets ? (
        <tr className='w-full text-center text-lg '>
            <td colSpan={1000}>
                <p className='text-xl'>No results.</p>
                <p>Maybe try to create a ticket or reload the page.</p>
            </td>
        </tr>
    ) : (
        <>
            <LayoutGroup>
                {tickets?.map((ticket) => {
                    if (ticket.ticketId === highlightTicket) {
                        const dateCreated = new Date(ticket.dateCreated);
                        return (
                            <Ticket
                                key={ticket.ticketId}
                                {...ticket}
                                dateCreated={dateCreated}
                                setSelectedId={setSelectedId}
                                highlight={true}
                            ></Ticket>
                        );
                    } else {
                        const dateCreated = new Date(ticket.dateCreated);
                        return (
                            <Ticket
                                key={ticket.ticketId}
                                {...ticket}
                                dateCreated={dateCreated}
                                setSelectedId={setSelectedId}
                                highlight={false}
                            ></Ticket>
                        );
                    }
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <Suspense
                            fallback={
                                <tr className='fixed inset-0 flex justify-center items-center'>
                                    <td className='bg-black w-20 h-20 rounded-lg flex justify-center items-center'>
                                        <Spinner></Spinner>
                                    </td>
                                </tr>
                            }
                        >
                            <tr>
                                <td>
                                    <TicketInfoModal
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    ></TicketInfoModal>
                                </td>
                            </tr>
                        </Suspense>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

export default Tickets;
