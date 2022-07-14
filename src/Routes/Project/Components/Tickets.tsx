import React from "react";
import Ticket from "./Ticket";
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
    return !tickets ? (
        <tr className='w-full text-center text-lg '>
            <td colSpan={1000}>
                <p className='text-xl'>No results.</p>
                <p>Maybe try to create a project or reload the page.</p>
            </td>
        </tr>
    ) : (
        tickets.map((ticket) => {
            const dateCreated = new Date(ticket.dateCreated);
            return (
                <Ticket
                    key={ticket.ticketId}
                    {...ticket}
                    dateCreated={dateCreated}
                ></Ticket>
            );
        })
    );
};

export default Tickets;
