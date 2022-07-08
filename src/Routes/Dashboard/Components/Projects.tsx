import { useMemo } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Components/Spinner";
import { useAppSelector } from "../../../Hooks/hooks";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export interface IProject {
    projectId: string;
    groupId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
}

const Projects = (props: { projects: IProject[] }): JSX.Element => {
    // get all users of each project

    return props.projects.length <= 0 ? (
        <tr className='w-full text-center text-lg '>
            <td colSpan={1000}>
                <p className='text-xl'>No results.</p>
                <p>Maybe try to create a project or reload the page.</p>
            </td>
        </tr>
    ) : (
        <>
            {props?.projects?.map((project) => {
                const dateCreated = new Date(project.dateCreated);
                return (
                    <tr
                        className='border-gray-200 border-b-2'
                        key={project.projectId}
                    >
                        <th
                            scope='row'
                            className='px-6 py-3 text-gray-800 font-semibold'
                        >
                            {project.projectName}
                        </th>
                        <td className='truncate max-w-[15ch] px-6 py-3'>
                            {project.projectDesc}
                        </td>
                        <td className='px-6 py-3'>
                            {dateCreated.toDateString()}
                        </td>
                        <td className='px-6 py-3'>
                            <ProjectUsers
                                users={project.users}
                                projectId={project.projectId}
                            ></ProjectUsers>
                        </td>
                        <td className='px-1 py-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                />
                            </svg>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

const ProjectUsers = (props: { users: string[]; projectId: string }) => {
    const axiosPrivate = useAxiosPrivate();
    const auth = useAppSelector((state) => state.auth);

    const foundUsers = async () => {
        const resp = await axiosPrivate("/user/users", {
            method: "post",
            data: { users: props.users },
            headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        return resp.data;
    };

    const { data: users, status } = useQuery(
        `users-${props.projectId}`,
        foundUsers,
        { enabled: props.users.length > 0 }
    );

    const UserElements = (props: { users: any }) =>
        useMemo(() => {
            return users?.map((user: any, index: number) => {
                if (index === props.users.length - 1) {
                    return <span>{user.firstName + " " + user.lastName}</span>;
                }
                return (
                    <span>{user.firstName + " " + user.lastName + ","}</span>
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

export default Projects;
