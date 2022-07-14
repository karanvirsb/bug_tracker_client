import React, { useMemo } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Components/Spinner";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import useComponentVisible from "../../../Hooks/useComponentVisible";
import useIsAdmin from "../../../Hooks/useIsAdmin";
import ProjectOptions from "./ProjectOptions";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Hooks/hooks";

type project = {
    projectId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
};

type projectUsersProps = { usersArr: string[] };

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

type user = {
    username: String;
    email: String;
    firstName: String;
    lastName: String;
};
type userElementProps = {
    users: user[];
};

const Project = ({
    projectId,
    projectName,
    projectDesc,
    dateCreated,
    users,
}: project) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false);
    const { getRoles } = useIsAdmin();
    const navigate = useNavigate();
    return (
        <tr
            className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
            key={projectId}
            onClick={() => navigate(`/project/${projectId}`)}
        >
            <th scope='row' className='px-6 py-3 text-gray-800 font-semibold'>
                {projectName}
            </th>
            <td className='truncate max-w-[15ch] px-6 py-3'>{projectDesc}</td>
            <td className='px-6 py-3'>{dateCreated.toDateString()}</td>
            <td className='px-6 py-3'>
                <ProjectUsers usersArr={users}></ProjectUsers>
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
                    {isComponentVisible && (
                        <ProjectOptions
                            projectId={projectId}
                            refs={ref}
                            setProjectOpen={setIsComponentVisible}
                        ></ProjectOptions>
                    )}
                </td>
            )}
        </tr>
    );
};

// TODO may not need to run this since we have users in groupData
const ProjectUsers = ({ usersArr }: projectUsersProps) => {
    // const axiosPrivate = useAxiosPrivate();

    const groupUsers = useAppSelector((state) => state.group.users);

    const users = [];
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    // const foundUsers = async (): Promise<IUser[]> => {
    //     const resp = await axiosPrivate("/user/users", {
    //         method: "post",
    //         data: { users: usersArr },
    //     });
    //     return resp.data;
    // };

    // const { data: users, status } = useQuery(`users-${projectId}`, foundUsers, {
    //     enabled: usersArr.length > 0,
    // });

    const UserElements = ({ users }: userElementProps) => {
        return (
            <>
                {useMemo(() => {
                    return users?.map((user: user, index: number) => {
                        if (index === users.length - 1) {
                            return (
                                <span key={user.username as string}>
                                    {`${user.firstName} ${user.lastName}`}
                                </span>
                            );
                        }
                        return (
                            <span key={user.username as string}>
                                {`${user.firstName} ${user.lastName}, `}
                            </span>
                        );
                    });
                }, [users])}
            </>
        );
    };

    return (
        <>
            {users ? (
                <UserElements users={users}></UserElements>
            ) : (
                <div>No Users</div>
            )}
        </>
    );
};

export default Project;
