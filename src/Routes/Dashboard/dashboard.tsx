import { useMemo, Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import Projects from "./Components/Projects";
import { QueryErrorResetBoundary, useQuery } from "react-query";
import Spinner from "../../Components/Spinner";
import ErrorFallback from "../../Components/ErrorFallback";
import { updateInitialState } from "../../Redux/Slices/projectSlice";
import { setModal } from "../../Redux/Slices/modalSlice";
import Pagination from "../../Components/Pagination";
// import { axiosPrivate } from "../../API/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { setUsers } from "../../Redux/Slices/groupSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const Dashboard = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useAppDispatch();
    const { getRoles } = useIsAdmin();
    // getting the group Id
    const auth = useAppSelector((state) => state.auth);
    const groupId = useAppSelector((state) => state.auth.group_id);

    const projectsState = useAppSelector((state) => state.projects.projects);

    // creating axios fetch for projects
    const fetchProjects = async (page: number) => {
        const resp = await axiosPrivate("/project/group/" + groupId, {
            method: "get",
            params: { page: page },
        });

        return resp.data;
    };

    const { data: projects, status } = useQuery(
        ["projectIds", pageNumber],
        () => fetchProjects(pageNumber),
        {
            suspense: true,
            keepPreviousData: true, // use this for pagination
        }
    );

    // fetching all the users of the group
    const fetchGroupUsers = async () => {
        const resp = await axiosPrivate("/user/group", {
            method: "Post",
            data: { groupId: groupId },
        });
        return resp.data;
    };

    const { data: usersData, status: groupUsersStatus } = useQuery(
        "groupUsers",
        fetchGroupUsers
    );

    useEffect(() => {
        if (status === "success") {
            dispatch(updateInitialState(projects.docs));
        }
    }, [projects, status, dispatch]);

    useEffect(() => {
        if (groupUsersStatus === "success") {
            dispatch(setUsers(usersData));
        }
    }, [groupUsersStatus, usersData, dispatch]);
    return (
        <section className='ml-[193px] mt-[22px] md:mt-[14px] md:ml-[68px]'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <div className='my-6 mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Projects
                    </h2>
                    {getRoles() && (
                        <button
                            className='bg-secondary-color text-white py-2 px-4 rounded-md font-semibold hover:bg-transparent hover:text-black hover:outline hover:outline-secondary-color hover:outline-2'
                            onClick={() =>
                                dispatch(
                                    setModal({
                                        open: true,
                                        type: "createProject",
                                        options: {},
                                    })
                                )
                            }
                        >
                            New Project
                        </button>
                    )}
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
                    <Pagination
                        pageNumber={pageNumber}
                        totalPage={projects?.totalPages || 0}
                        hasMore={projects.hasNextPage || false}
                        setPageNumber={setPageNumber}
                    ></Pagination>
                    {/* <div className='w-full flex justify-center items-center py-4 gap-4'>
                        <button className='pagination-btn'>Prev</button>
                        <span className='bg-secondary-color text-white w-10 h-10 text-2xl flex justify-center items-center text-center rounded-full'>
                            1
                        </span>
                        <button className='bg-btn-color text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-black hover:font-semibold hover:outline hover:outline-btn-color hover:outline-2'>
                            Next
                        </button>
                    </div> */}
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
