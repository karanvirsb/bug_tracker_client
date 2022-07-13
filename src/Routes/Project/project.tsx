import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorFallback from "../../Components/ErrorFallback";
import Spinner from "../../Components/Spinner";
import axiosPrivate from "../../Components/AxiosInterceptors";
import Pagination from "../../Components/Pagination";

const Project = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { projectId } = useParams();

    const fetchTickets = async () => {
        const resp = await axiosPrivate("/ticket/project/" + projectId, {
            method: "get",
            params: {
                page: pageNumber,
                limit: 10,
            },
        });
        return resp.data;
    };

    const { data: tickets, status: ticketStatus } = useQuery(
        "projectTickets",
        fetchTickets,
        {
            suspense: true,
            keepPreviousData: true,
        }
    );

    return (
        <section className='sections'>
            <h1 className='text-2xl font-semibold'>Project Name</h1>
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
                            <QueryErrorResetBoundary>
                                {({ reset }) => (
                                    <ErrorBoundary
                                        onReset={reset}
                                        FallbackComponent={ErrorFallback}
                                    >
                                        <Suspense
                                            fallback={<Spinner></Spinner>}
                                        ></Suspense>
                                    </ErrorBoundary>
                                )}
                            </QueryErrorResetBoundary>
                        </tbody>
                    </table>
                    <Pagination
                        pageNumber={pageNumber}
                        totalPage={tickets.totalPage || 0}
                        hasMore={tickets.hasNextPage || false}
                        setPageNumber={setPageNumber}
                    ></Pagination>
                </div>
            </div>
        </section>
    );
};

export default Project;
