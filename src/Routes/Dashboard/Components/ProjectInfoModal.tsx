import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../Hooks/hooks";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};
const ProjectInfoModal = ({ selectedId, setSelectedId }: props) => {
    const projects = useAppSelector((state) => state.projects.projects);
    const project = projects.find(
        (project) => project.projectId === selectedId
    );

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

    const projectInfoBgConstraint = {
        hidden: { opacity: 0, transition },
        visible: { opacity: 1, transition },
        exit: { opacity: 0, transition },
    };

    const projectInfoConstraint = {
        hidden: { opacity: 0, y: 100, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: 100, transition },
    };

    return (
        <motion.div
            className='bg-backdrop-bg fixed inset-0 flex justify-center items-center flex-col'
            variants={projectInfoBgConstraint}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <motion.div
                className='bg-white p-4 max-w-[400px] w-full  max-h-[350px] h-full rounded-md'
                variants={projectInfoConstraint}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <div className='border-b-[1px] border-black flex justify-between items-center pb-4 mb-4'>
                    <div className='flex flex-col gap-'>
                        <h1 className='text-2xl'>{project?.projectName}</h1>
                        <p className='text-gray-600'>
                            {new Date(
                                project?.dateCreated ?? ""
                            ).toDateString()}
                        </p>
                    </div>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-9 w-9 fill-gray-600 cursor-pointer hover:fill-red-400 hover:text-black'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        onClick={() => setSelectedId(null)}
                    >
                        <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clipRule='evenodd'
                        />
                    </svg>
                </div>
                <p>{project?.projectDesc}</p>
                <UserElements usersArr={project?.users ?? []}></UserElements>
            </motion.div>
        </motion.div>
    );
};

type user = {
    username: String;
    email: String;
    firstName: String;
    lastName: String;
};

type userProps = {
    usersArr: string[];
};

type userElementProps = {
    users: user[];
};
const UserElements = ({ usersArr }: userProps) => {
    const groupUsers = useAppSelector((state) => state.group.users);

    const users = [];
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    return (
        <ul>
            {users.map((user) => {
                return <li>{`${user.firstName} ${user.lastName}`}</li>;
            })}
        </ul>
    );
};

export default ProjectInfoModal;
