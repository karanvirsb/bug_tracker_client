import React, { useState, useEffect, lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
const Projects = lazy(() => import("../Components/Projects"));
import Spinner from "../../../Components/Spinner";
import { setModal } from "../../../Redux/Slices/modalSlice";
const Pagination = lazy(() => import("../../../Components/Pagination"));
import useIsAdmin from "../../../Hooks/useIsAdmin";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { updateInitialState } from "../../../Redux/Slices/projectsSlice";

type props = {
    groupId: string | undefined;
};

const DashboardTab = ({ groupId }: props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [errMsg, setErrMsg] = useState("");

    const projectsState = useAppSelector((state) => state.projects.projects);

    const dispatch = useAppDispatch();
    const { isAdmin, isEditor } = useIsAdmin();

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

    useEffect(() => {
        if (status === "success") {
            dispatch(updateInitialState(projects.docs));
        }
    }, [projects, status, dispatch]);

    return (
        <>
            {/* <h1 className='text-3xl font-semibold text-zinc-400'>Dashboard</h1> */}
            <div className='my-6 mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-semibold text-gray-800'>
                        Projects
                    </h2>
                    {/* only allowing admins or editors to create new projects */}
                    {(isAdmin || isEditor) && (
                        <button
                            className='createNewBtn'
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
                            <tr className='w-full'>
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
                                    <td colSpan={99} align='center'>
                                        <Spinner></Spinner>
                                    </td>
                                </tr>
                            )}
                            {status === "success" && (
                                <Suspense
                                    fallback={
                                        <tr>
                                            <td align='center' colSpan={99}>
                                                <Spinner></Spinner>
                                            </td>
                                        </tr>
                                    }
                                >
                                    <Projects
                                        projects={projectsState}
                                    ></Projects>
                                </Suspense>
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
                    <Suspense
                        fallback={
                            <div className='bg-white w-full rounded-lg flex justify-center items-center mt-2'>
                                <Spinner></Spinner>
                            </div>
                        }
                    >
                        <Pagination
                            pageNumber={pageNumber}
                            totalPage={projects?.totalPages || 0}
                            hasMore={projects?.hasNextPage || false}
                            setPageNumber={setPageNumber}
                        ></Pagination>
                    </Suspense>
                </div>
            </div>
            <div>
                {/* TODO */}
                <div>
                    <h2>Ticket Status</h2>
                </div>
            </div>
        </>
    );
};

export default DashboardTab;
