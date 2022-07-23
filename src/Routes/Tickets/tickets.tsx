import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Pagination from "../../Components/Pagination";
import Spinner from "../../Components/Spinner";
import { useAppSelector } from "../../Hooks/hooks";
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

    return (
        <section className='sections'>
            <div className='my-6 mx-4'>
                <h1 className='text-xl font-semibold text-gray-800'>
                    My Tickets
                </h1>
                <div className='outline-[#D4D4D4] outline-1 outline w-full px-4 text-left rounded-md'>
                    <table className=' w-full'>
                        <thead className='text-sm text-gray-500 font-normal'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-6 py-3 sm:text-center'
                                >
                                    TITLE
                                </th>
                                <th scope='col' className='px-6 py-3 lg:hidden'>
                                    REPORTER
                                </th>
                                <th scope='col' className='px-6 py-3 lg:hidden'>
                                    DATE CREATED
                                </th>
                                <th scope='col' className='px-6 py-3 md:hidden'>
                                    TYPE
                                </th>
                                <th scope='col' className='px-6 py-3 sm:hidden'>
                                    STATUS
                                </th>
                                <th scope='col' className='px-6 py-3 lg:hidden'>
                                    ASSIGNEE
                                </th>
                                <th scope='col' className='px-6 py-3 sm:hidden'>
                                    SEVERITY
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {ticketStatus === "loading" && (
                                <tr className='w-full text-center'>
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
                                <tr className='w-full text-center text-lg '>
                                    <td colSpan={1000}>
                                        <p className='my-3 text-xl'>{errMsg}</p>
                                        <button
                                            className='btn bg-gray-300 mb-5'
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
            </div>
        </section>
    );
};

export default Tickets;
