import React from "react";
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
    userId: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    groupId: string;
    refreshToken: string;
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
    return (
        <tr
            className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
            key={projectId}
            onClick={() => setSelectedId(projectId)}
        >
            <th
                scope='row'
                className='px-6 py-3 text-gray-800 font-semibold sm:text-center'
            >
                {projectName}
            </th>
            <td className='truncate max-w-[15ch] px-6 py-3 md:hidden'>
                {projectDesc}
            </td>
            <td className='px-6 py-3 md:hidden'>
                {dateCreated.toDateString()}
            </td>
            <td className='px-6 py-3 sm:hidden'>
                <Members usersArr={users}></Members>
            </td>
        </tr>
    );
};

export default Project;
