import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import Projects from "./Components/Projects";
import { useQuery } from "react-query";
import Spinner from "../../Components/Spinner";
import { updateInitialState } from "../../Redux/Slices/projectsSlice";
import { setModal } from "../../Redux/Slices/modalSlice";
import Pagination from "../../Components/Pagination";
import axiosPrivate from "../../Components/AxiosInterceptors";
import { setUsers } from "../../Redux/Slices/groupSlice";
import useIsAdmin from "../../Hooks/useIsAdmin";

const Dashboard = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    // const axiosPrivate = useAxiosPrivate();
    const dispatch = useAppDispatch();
    const { getRoles } = useIsAdmin();

    // getting the group Id
    const groupId = useAppSelector(
        (state) => state.persistedReducer.auth.group_id
    );

    const projectsState = useAppSelector((state) => state.projects.projects);

    // creating axios fetch for projects
    const fetchProjects = async (page: number) => {
        const resp = await axiosPrivate("/project/group/" + groupId, {
            method: "get",
            params: { page: page },
        });

        return resp.data;
    };

    // TODO error catching
    const {
        data: projects,
        status,
        refetch,
    } = useQuery(["projectIds", pageNumber], () => fetchProjects(pageNumber), {
        keepPreviousData: true, // use this for pagination
    });

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
        <section className='sections'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <div className='my-6 m-md:mx-4 md:mr-1 md:ml-[-50px]'>
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
                                <th
                                    scope='col'
                                    className='px-6 py-3 sm:text-center'
                                >
                                    PROJECT
                                </th>
                                <th scope='col' className='px-6 py-3 md:hidden'>
                                    DESCRIPTION
                                </th>
                                <th scope='col' className='px-6 py-3 md:hidden'>
                                    DATE CREATED
                                </th>
                                <th scope='col' className='px-6 py-3 sm:hidden'>
                                    MEMBERS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {status === "loading" && (
                                <tr className='w-full text-center'>
                                    <td colSpan={99}>
                                        <Spinner></Spinner>
                                    </td>
                                </tr>
                            )}
                            {status === "success" && (
                                <Projects projects={projectsState}></Projects>
                            )}
                            {status === "error" && (
                                <tr className='w-full text-center text-lg '>
                                    <td colSpan={1000}>
                                        <p className='my-3 text-xl'>
                                            {errMsg ||
                                                "Could not fetch projects!"}
                                        </p>
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
                        totalPage={projects?.totalPages || 0}
                        hasMore={projects?.hasNextPage || false}
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
