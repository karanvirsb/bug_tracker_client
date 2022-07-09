import React, { useState } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Components/Spinner";
import { useAppSelector } from "../../../Hooks/hooks";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useComponentVisible from "../../../Hooks/useComponentVisible";
import ProjectOptions from "./ProjectOptions";

type project = {
    projectId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
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
    return (
        <tr className='border-gray-200 border-b-2' key={projectId}>
            <th scope='row' className='px-6 py-3 text-gray-800 font-semibold'>
                {projectName}
            </th>
            <td className='truncate max-w-[15ch] px-6 py-3'>{projectDesc}</td>
            <td className='px-6 py-3'>{dateCreated.toDateString()}</td>
            <td className='px-6 py-3'>
                <ProjectUsers
                    usersArr={users}
                    projectId={projectId}
                ></ProjectUsers>
            </td>
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
        </tr>
    );
};

type projectUsersProps = { usersArr: string[]; projectId: string };

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

const ProjectUsers = ({ usersArr, projectId }: projectUsersProps) => {
    const axiosPrivate = useAxiosPrivate();
    const auth = useAppSelector((state) => state.auth);

    const foundUsers = async (): Promise<IUser[]> => {
        const resp = await axiosPrivate("/user/users", {
            method: "post",
            data: { users: usersArr },
            headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        return resp.data;
    };

    const { data: users, status } = useQuery(`users-${projectId}`, foundUsers, {
        enabled: usersArr.length > 0,
    });

    const UserElements = (props: { users: any }) =>
        useMemo(() => {
            return props.users?.map((user: any, index: number) => {
                if (index === props.users.length - 1) {
                    return (
                        <span key={user.username}>
                            {user.firstName + " " + user.lastName}
                        </span>
                    );
                }
                return (
                    <span key={user.username}>
                        {user.firstName + " " + user.lastName + ", "}
                    </span>
                );
            });
        }, [props.users]);

    return (
        <>
            {status === "loading" ? (
                <Spinner></Spinner>
            ) : status === "success" ? (
                <UserElements users={users}></UserElements>
            ) : (
                <div>No Users</div>
            )}
        </>
    );
};

export default Project;
