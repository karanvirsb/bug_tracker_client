import React, { useMemo, Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import Projects from "./Components/Projects";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Spinner from "../../Components/Spinner";
import ErrorFallback from "../../Components/ErrorFallback";
import { updateInitialState } from "../../Redux/Slices/projectSlice";

const Dashboard = () => {
    const [pageNumber, setPageNumber] = useState(0);
    // getting the group Id
    const auth = useAppSelector((state) => state.auth);
    const groupId = useMemo(() => auth.group_id, [auth.group_id]);
    const axiosPrivate = useAxiosPrivate();

    const dispatch = useAppDispatch();
    const projectsState = useAppSelector((state) => state.projects.projects);

    // creating axios fetch for projects
    const fetchProjects = async () => {
        const resp = await axiosPrivate.get("/project/group/" + groupId, {
            params: { page: pageNumber },
        });

        return resp.data;
    };

    const {
        data: projects,
        status,
        error,
    } = useQuery("projectIds", fetchProjects, {
        suspense: true,
    });

    useEffect(() => {
        if (status === "success") {
            dispatch(updateInitialState(projects));
        }
    }, [projects, status]);

    return (
        <section className='ml-[193px] mt-[22px] md:mt-[14px] md:ml-[68px]'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <div className='my-6 mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Projects
                    </h2>
                    <button className='bg-secondary-color text-white py-2 px-4 rounded-md font-semibold hover:bg-transparent hover:text-black hover:outline hover:outline-secondary-color hover:outline-2'>
                        New Project
                    </button>
                </div>
                <div className='outline-[#D4D4D4] outline-1 outline w-full px-4 text-left rounded-md'>
                    <table className=' w-full'>
                        <thead className='text-sm text-gray-500 font-normal'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    PROJECT
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    DESCRIPTION
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    DATE CREATED
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    MEMBERS
                                </th>
                                <th scope='col' className='px-6 py-3'></th>
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
                                        >
                                            <Projects
                                                projects={projectsState}
                                            ></Projects>
                                        </Suspense>
                                    </ErrorBoundary>
                                )}
                            </QueryErrorResetBoundary>
                        </tbody>
                    </table>
                    <div className='w-full flex justify-center items-center py-4 gap-4'>
                        <button className='pagination-btn'>Prev</button>
                        <span className='bg-secondary-color text-white w-10 h-10 text-2xl flex justify-center items-center text-center rounded-full'>
                            1
                        </span>
                        <button className='bg-btn-color text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-black hover:font-semibold hover:outline hover:outline-btn-color hover:outline-2'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h2>Ticket Status</h2>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
