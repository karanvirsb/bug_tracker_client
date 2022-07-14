import React from "react";
import { ITicket } from "./Tickets";

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
    return <div>Ticket</div>;
};

export default Ticket;
