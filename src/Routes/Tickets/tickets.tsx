import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Pagination from "../../Components/Pagination";
import Spinner from "../../Components/Spinner";
import Tab from "../../Components/Tab/Tab";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { updateInitialState } from "../../Redux/Slices/ticketsSlice";
import UserTickets from "./Components/UserTickets";

type fetchTicketsByUsernameType = {
    username: string;
    currentPage: number;
};

const Tickets = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const username = useAppSelector(
        (state) => state.persistedReducer.user.username
    );
    const dispatch = useAppDispatch();

    const fetchTicketsByUsername = async ({
        username,
        currentPage,
    }: fetchTicketsByUsernameType) => {
        const resp = await axiosPrivate("/ticket/user/" + username, {
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

    useEffect(() => {
        if (ticketStatus === "success") {
            dispatch(updateInitialState(userTickets.docs));
        }
    }, [userTickets, ticketStatus]);

    return (
        <section className="sections">
            <Tab tabs={[]} components={{}}></Tab>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                My Tickets
            </h1>
            <div className="outline-[#D4D4D4] outline-1 outline px-1 text-left rounded-md mx-4 md:mr-1 md:ml-[-50px] p-1">
                <table className="w-full">
                    <thead className="text-sm text-gray-500 font-normal">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 sm:text-center"
                            >
                                TITLE
                            </th>
                            <th scope="col" className="px-6 py-3 lg:hidden">
                                REPORTER
                            </th>
                            <th scope="col" className="px-6 py-3 lg:hidden">
                                DATE CREATED
                            </th>
                            <th scope="col" className="px-6 py-3 md:hidden">
                                TYPE
                            </th>
                            <th scope="col" className="px-6 py-3 sm:hidden">
                                STATUS
                            </th>
                            <th scope="col" className="px-6 py-3 lg:hidden">
                                ASSIGNEE
                            </th>
                            <th scope="col" className="px-6 py-3 sm:hidden">
                                SEVERITY
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {ticketStatus === "loading" && (
                            <tr className="w-full text-center">
                                <td colSpan={99}>
                                    <Spinner></Spinner>
                                </td>
                            </tr>
                        )}
                        {ticketStatus === "success" && (
                            <UserTickets
                                tickets={userTickets.docs}
                            ></UserTickets>
                        )}
                        {ticketStatus === "error" && (
                            <tr className="w-full text-center text-lg ">
                                <td colSpan={1000}>
                                    <p className="my-3 text-xl">{errMsg}</p>
                                    <button
                                        className="btn bg-gray-300 mb-5"
                                        onClick={() => refetch}
                                    >
                                        try again
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    pageNumber={pageNumber}
                    totalPage={userTickets?.totalPage || 0}
                    hasMore={userTickets?.hasNextPage || false}
                    setPageNumber={setPageNumber}
                ></Pagination>
            </div>
        </section>
    );
};

export default Tickets;
