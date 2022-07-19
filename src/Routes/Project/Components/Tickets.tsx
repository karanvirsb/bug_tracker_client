import { AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState } from "react";
import Ticket from "./Ticket";
import TicketInfoModal from "./TicketInfoModal";
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
};

const Tickets = ({ tickets }: props) => {
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
                    const dateCreated = new Date(ticket.dateCreated);
                    return (
                        <Ticket
                            key={ticket.ticketId}
                            {...ticket}
                            dateCreated={dateCreated}
                        ></Ticket>
                    );
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <tr>
                            <td>
                                <TicketInfoModal
                                    selectedId={selectedId}
                                    setSelectedId={setSelectedId}
                                ></TicketInfoModal>
                            </td>
                        </tr>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

export default Tickets;
