import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { useParams } from "react-router-dom";
import ErrorFallback from "../../Components/ErrorFallback";
import Spinner from "../../Components/Spinner";

const Project = () => {
    const { projectId } = useParams();

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
                    {/* <Pagination
                        pageNumber={}
                        totalPage={}
                        hasMore={}}
                        setPageNumber={}
                    ></Pagination> */}
                </div>
            </div>
        </section>
    );
};

export default Project;
