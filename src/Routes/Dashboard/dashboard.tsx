import React, { useMemo } from "react";
import { useAppSelector } from "../../Hooks/hooks";
import Projects from "./Components/Projects";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const Dashboard = () => {
    // getting the group Id
    const auth = useAppSelector((state) => state.auth);
    const groupId = useMemo(() => auth.group_id, [auth.group_id]);

    // creating axios fetch for projects
    const axiosPrivate = useAxiosPrivate();
    const fetchProjects = async () => {
        return await axiosPrivate("/project/group/", {
            method: "get",
            params: { id: groupId },
        });
    };

    const projectQuery = useQuery("projectIds", fetchProjects);

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
                            <Projects
                                projects={projectQuery.data?.data}
                            ></Projects>
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
