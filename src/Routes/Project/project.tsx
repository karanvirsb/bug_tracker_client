import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Pagination from "../../Components/Pagination";
import Tickets from "./Components/Tickets";
import { toast } from "react-toastify";
import { useAppSelector } from "../../Hooks/hooks";

const Project = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const { projectId } = useParams();

    const fetchTickets = async (pageNumber: number) => {
        const resp = await axiosPrivate("/ticket/project/" + projectId, {
            method: "get",
            params: {
                page: pageNumber,
                limit: 10,
            },
        });
        return resp.data;
    };

    const fetchProject = async () => {
        const resp = await axiosPrivate("/project/id", {
            method: "post",
            data: { filter: "projectId", filterValue: projectId },
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

    const { data: project, status: projectStatus } = useQuery(
        "ticketProject",
        fetchProject
    );

    return (
        <section className='sections'>
            <h1 className='text-2xl font-semibold'>
                {projectStatus === "loading" && <Spinner></Spinner>}
                {projectStatus === "success" && project?.projectName}
            </h1>
            <div className='my-6 mx-4'>
                <div className='flex justify-end items-center mb-4'>
                    <button className='bg-secondary-color text-white py-2 px-4 rounded-md font-semibold hover:bg-transparent hover:text-black hover:outline hover:outline-secondary-color hover:outline-2'>
                        New Ticket
                    </button>
                </div>
                <div className='outline-[#D4D4D4] outline-1 outline w-full px-4 text-left rounded-md'>
                    <table className=' w-full'>
                        <thead className='text-sm text-gray-500 font-normal'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    TITLE
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    REPORTER
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    DATE CREATED
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    TYPE
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    STATUS
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    ASSIGNEE
                                </th>
                                <th scope='col' className='px-6 py-3'>
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
                                <Tickets tickets={tickets}></Tickets>
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
        </section>
    );
};

export default Project;
