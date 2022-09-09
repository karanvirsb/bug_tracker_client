import React, { useEffect, useState, lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import ErrorFallbackWithoutRetry from "../../../Components/ErrorFallback/ErrorFallbackWithoutRetry";
import ErrorFallbackWithoutRetryForTable from "../../../Components/ErrorFallback/ErrorFallbackWithoutRetryForTable";
import Spinner from "../../../Components/Spinner";
import { useAppDispatch } from "../../../Hooks/hooks";
import { users } from "../../../Redux/Slices/groupSlice";
import { setModal } from "../../../Redux/Slices/modalSlice";
import { updateInitialState } from "../../../Redux/Slices/ticketsSlice";
import useCheckTicketPermissions from "../Hooks/useCheckTicketPermissions";
const Tickets = lazy(() => import("./Tickets"));
const Pagination = lazy(() => import("../../../Components/Pagination"));

type props = {
    projectId: string | undefined;
    project: any;
    projectStatus: "idle" | "error" | "loading" | "success";
    projectUsers: users[];
    findTicketId?: string;
};

const TicketsTab = ({
    projectId,
    project,
    projectStatus,
    projectUsers,
    findTicketId,
}: props) => {
    const PAGE_LIMIT = 5;
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const { checkUserPermissions } = useCheckTicketPermissions();
    const isUserAllowed = checkUserPermissions({ users: projectUsers });

    const dispatch = useAppDispatch();

    // this is to fetch the page, where the ticket is located
    const fetchTicketInfo = async () => {
        const resp = await axiosPrivate(
            `/ticket/findTicketInfo?ticketId=${findTicketId}&projectId=${projectId}&limit=${PAGE_LIMIT}`,
            {
                method: "get",
            }
        );
        return resp.data;
    };

    const { data: ticketInfo, status: ticketInfoStatus } = useQuery(
        "findTicketInfo",
        fetchTicketInfo,
        {
            enabled: findTicketId !== undefined,
            onError: (err: any) => {
                if (err?.response?.status === 404) {
                    setErrMsg("Invalid url could not fetch.");
                }
            },
        }
    );

    const fetchTickets = async (pages: number) => {
        const resp = await axiosPrivate("/ticket/project/" + projectId, {
            method: "get",
            params: {
                page: pages,
                limit: PAGE_LIMIT,
            },
        });
        return resp.data;
    };

    const {
        data: tickets,
        status: ticketStatus,
        refetch,
    } = useQuery("projectTickets", () => fetchTickets(pageNumber), {
        keepPreviousData: true,
        onError: (err: any) => {
            if (err?.response?.status === 404) {
                setErrMsg("Invalid url could not fetch.");
            }
        },
    });

    const openAddTicketModal = () => {
        dispatch(setModal({ open: true, type: "createTicket", options: {} }));
    };

    useEffect(() => {
        if (ticketStatus === "success") {
            dispatch(updateInitialState(tickets.docs));
        }
    }, [tickets, ticketStatus]);

    useEffect(() => {
        refetch();
    }, [pageNumber]);

    useEffect(() => {
        if (ticketInfoStatus === "success") {
            if (ticketInfo?.ticketsPage != pageNumber) {
                setPageNumber(ticketInfo?.ticketsPage ?? 1);
            }
        }
    }, [ticketInfoStatus, ticketInfo]);

    return (
        <>
            <h1 className='text-2xl font-semibold'>
                {projectStatus === "loading" && <Spinner></Spinner>}
                {projectStatus === "success" && project?.projectName}
            </h1>
            <div className='my-6 mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Tickets
                    </h2>
                    {isUserAllowed && (
                        <button
                            className='createNewBtn'
                            onClick={openAddTicketModal}
                        >
                            New Ticket
                        </button>
                    )}
                </div>
                <div className='table_container w-full'>
                    <table className=' w-full'>
                        <thead className='table_header'>
                            <tr>
                                <th
                                    scope='col'
                                    className='table_padding sm:text-center'
                                >
                                    TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding lg:hidden'
                                >
                                    REPORTER
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding lg:hidden'
                                >
                                    DATE CREATED
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding md:hidden'
                                >
                                    TYPE
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding sm:hidden'
                                >
                                    STATUS
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding lg:hidden'
                                >
                                    ASSIGNEE
                                </th>
                                <th
                                    scope='col'
                                    className='table_padding sm:hidden'
                                >
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
                                <ErrorBoundary
                                    fallback={
                                        <ErrorFallbackWithoutRetryForTable text='Error: Could not load tickets'></ErrorFallbackWithoutRetryForTable>
                                    }
                                >
                                    <Suspense
                                        fallback={
                                            <tr>
                                                <td align='center' colSpan={99}>
                                                    <Spinner></Spinner>
                                                </td>
                                            </tr>
                                        }
                                    >
                                        <Tickets
                                            tickets={tickets.docs}
                                            highlightTicket={
                                                ticketInfo?.ticketId
                                            }
                                        ></Tickets>
                                    </Suspense>
                                </ErrorBoundary>
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
                    <ErrorBoundary
                        fallback={
                            <ErrorFallbackWithoutRetry text='Error: Could not load paginaton.'></ErrorFallbackWithoutRetry>
                        }
                    >
                        <Suspense
                            fallback={
                                <div className='bg-white w-full rounded-lg flex justify-center items-center mt-2'>
                                    <Spinner></Spinner>
                                </div>
                            }
                        >
                            <Pagination
                                pageNumber={pageNumber}
                                totalPage={tickets?.totalPages || 0}
                                hasMore={tickets?.hasNextPage || false}
                                setPageNumber={setPageNumber}
                            ></Pagination>
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
};

export default TicketsTab;
