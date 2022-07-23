import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../../Components/AxiosInterceptors";
import { useAppSelector } from "../../Hooks/hooks";

type fetchTicketsByUsernameType = {
    username: string;
    currentPage: number;
};

const Tickets = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const username = useAppSelector(
        (state) => state.persistedReducer.user.username
    );

    const fetchTicketsByUsername = async ({
        username,
        currentPage,
    }: fetchTicketsByUsernameType) => {
        const resp = await axiosPrivate("/tickets/user/" + username, {
            method: "get",
            params: { page: currentPage },
        });
        return resp.data;
    };

    const {
        data: userTickets,
        status: ticketStatus,
        refetch,
    } = useQuery(
        "userTickets",
        () =>
            fetchTicketsByUsername({
                username: username,
                currentPage: pageNumber,
            }),
        {
            keepPreviousData: true,
        }
    );

    return <div>Tickets</div>;
};

export default Tickets;
