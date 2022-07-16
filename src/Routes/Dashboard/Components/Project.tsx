import React, { useMemo } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Components/Spinner";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import useComponentVisible from "../../../Hooks/useComponentVisible";
import useIsAdmin from "../../../Hooks/useIsAdmin";
import ProjectOptions from "./ProjectOptions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/hooks";
import Members from "../../../Components/Members";

type project = {
    projectId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface IUser {
    userId: String;
    username: String;
    password: String;
    email: String;
    firstName: String;
    lastName: String;
    groupId: String;
    refreshToken: String;
    roles: Object;
}

const Project = ({
    projectId,
    projectName,
    projectDesc,
    dateCreated,
    users,
    setSelectedId,
}: project) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false);
    const { getRoles } = useIsAdmin();
    const navigate = useNavigate();
    return (
        <tr
            className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
            key={projectId}
            onClick={() => setSelectedId(projectId)}
        >
            <th scope='row' className='px-6 py-3 text-gray-800 font-semibold'>
                {projectName}
            </th>
            <td className='truncate max-w-[15ch] px-6 py-3'>{projectDesc}</td>
            <td className='px-6 py-3'>{dateCreated.toDateString()}</td>
            <td className='px-6 py-3'>
                <Members usersArr={users}></Members>
            </td>
            {/* only if user is admin should you display this column */}
            {getRoles() && (
                <td className='px-1 py-3 relative'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 relative'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        onClick={() => setIsComponentVisible(true)}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                        />
                    </svg>
                    {/* {isComponentVisible && (
                        <ProjectOptions
                            projectId={projectId}
                            refs={ref}
                            setProjectOpen={setIsComponentVisible}
                        ></ProjectOptions>
                    )} */}
                </td>
            )}
        </tr>
    );
};

export default Project;
