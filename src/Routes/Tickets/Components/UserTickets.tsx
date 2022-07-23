import { AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState } from "react";

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

const UserTickets = ({ tickets }: props) => {
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
                        <UserTicket
                            key={ticket.ticketId}
                            {...ticket}
                            dateCreated={dateCreated}
                            setSelectedId={setSelectedId}
                        ></UserTicket>
                    );
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <tr>
                            <td>
                                <UserTicketInfoModal
                                    selectedId={selectedId}
                                    setSelectedId={setSelectedId}
                                ></UserTicketInfoModal>
                            </td>
                        </tr>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

export default UserTickets;
