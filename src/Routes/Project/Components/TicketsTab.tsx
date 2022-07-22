import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import Pagination from "../../../Components/Pagination";
import Spinner from "../../../Components/Spinner";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setModal } from "../../../Redux/Slices/modalSlice";
import { updateInitialState } from "../../../Redux/Slices/ticketsSlice";
import Tickets from "./Tickets";

type props = {
    projectId: string | undefined;
    project: any;
    projectStatus: "idle" | "error" | "loading" | "success";
};

const TicketsTab = ({ projectId, project, projectStatus }: props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");

    const dispatch = useAppDispatch();

    const fetchTickets = async (pages: number) => {
        const resp = await axiosPrivate("/ticket/project/" + projectId, {
            method: "get",
            params: {
                page: pages,
                limit: 10,
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

    return (
        <>
            <h1 className='text-2xl font-semibold'>
                {projectStatus === "loading" && <Spinner></Spinner>}
                {projectStatus === "success" && project?.projectName}
            </h1>
            <div className='my-6 m-md:mx-4 md:mr-1 md:ml-[-50px]'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Tickets
                    </h2>
                    <button
                        className='bg-secondary-color text-white py-2 px-4 rounded-md font-semibold hover:bg-transparent hover:text-black hover:outline hover:outline-secondary-color hover:outline-2'
                        onClick={openAddTicketModal}
                    >
                        New Ticket
                    </button>
                </div>
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
                                <Tickets tickets={tickets.docs}></Tickets>
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
                        totalPage={tickets?.totalPage || 0}
                        hasMore={tickets?.hasNextPage || false}
                        setPageNumber={setPageNumber}
                    ></Pagination>
                </div>
            </div>
        </>
    );
};

export default TicketsTab;
