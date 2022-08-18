import React, { lazy, Suspense, useEffect, useState } from "react";
const Pagination = lazy(() => import("../../Components/Pagination"));
const UserTickets = lazy(() => import("./Components/UserTickets"));
import { useQuery } from "react-query";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Spinner from "../../Components/Spinner";
import Tab from "../../Components/Tab/Tab";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { updateInitialState } from "../../Redux/Slices/ticketsSlice";

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
        <section className='sections'>
            <Tab tabs={[]} components={{}}></Tab>
            <h1 className='table_name mb-4 mx-4'>My Tickets</h1>
            <div className='table_container mx-4 md:mr-1'>
                <table className='w-full'>
                    <thead className='table_header'>
                        <tr>
                            <th
                                scope='col'
                                className='table_padding sm:text-center'
                            >
                                TITLE
                            </th>
                            <th scope='col' className='table_padding lg:hidden'>
                                REPORTER
                            </th>
                            <th scope='col' className='table_padding lg:hidden'>
                                DATE CREATED
                            </th>
                            <th scope='col' className='table_padding md:hidden'>
                                TYPE
                            </th>
                            <th scope='col' className='table_padding sm:hidden'>
                                STATUS
                            </th>
                            <th scope='col' className='table_padding lg:hidden'>
                                ASSIGNEE
                            </th>
                            <th scope='col' className='table_padding sm:hidden'>
                                SEVERITY
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {ticketStatus === "loading" && (
                            <tr>
                                <td align='center' colSpan={99}>
                                    <Spinner></Spinner>
                                </td>
                            </tr>
                        )}
                        {ticketStatus === "success" && (
                            <Suspense
                                fallback={
                                    <tr>
                                        <td align='center' colSpan={99}>
                                            <Spinner></Spinner>
                                        </td>
                                    </tr>
                                }
                            >
                                <UserTickets
                                    tickets={userTickets.docs}
                                ></UserTickets>
                            </Suspense>
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
                <Suspense
                    fallback={
                        <div className='bg-white w-full rounded-lg flex justify-center items-center mt-2'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    <Pagination
                        pageNumber={pageNumber}
                        totalPage={userTickets?.totalPage || 0}
                        hasMore={userTickets?.hasNextPage || false}
                        setPageNumber={setPageNumber}
                    ></Pagination>
                </Suspense>
            </div>
        </section>
    );
};

export default Tickets;
