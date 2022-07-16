import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import Backdrop from "../../../Components/Backdrop";
import { setModal } from "../../../Redux/Slices/modalSlice";
import { useNavigate } from "react-router-dom";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};
const ProjectInfoModal = ({ selectedId, setSelectedId }: props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const projects = useAppSelector((state) => state.projects.projects);
    const project = projects.find(
        (project) => project.projectId === selectedId
    );

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

    const projectInfoConstraint = {
        hidden: { opacity: 0, y: 100, transition },
        visible: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: 100, transition },
    };

    const openEditModal = () => {
        dispatch(
            setModal({
                type: "updateProject",
                open: true,
                options: { projectId: project?.projectId },
            })
        );
        setSelectedId(null);
    };

    const openDeleteModal = () => {
        dispatch(
            setModal({
                type: "deleteProject",
                open: true,
                options: { projectId: project?.projectId },
            })
        );
        setSelectedId(null);
    };

    const navigateToTickets = () => {
        setSelectedId(null);
        navigate(`/project/${project?.projectId}`);
    };

    return (
        <Backdrop onClick={() => setSelectedId(null)}>
            <motion.div
                className='bg-white flex flex-col flex-1 justify-between p-4 max-w-[400px] w-full  max-h-[400px] h-full rounded-md'
                variants={projectInfoConstraint}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => e.stopPropagation()} // stop from bubbling up to the backdrop and closing
            >
                <div className='border-b-[1px] border-black flex justify-between items-center pb-4'>
                    <div className='flex flex-col gap-1'>
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
                <div>
                    <h2 className='text-gray-500 text-lg'>Description:</h2>
                    <p className='max-w-[100ch] w-full text-lg max-h-[100px] overflow-auto'>
                        {project?.projectDesc}
                    </p>
                </div>
                <div>
                    <h2 className='text-gray-500 text-lg'>Users:</h2>
                    <UserElements
                        usersArr={project?.users ?? []}
                    ></UserElements>
                </div>
                <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 justify-self-end'>
                    <button
                        className='btn bg-green-400'
                        onClick={openEditModal}
                    >
                        Edit
                    </button>
                    <button
                        className='btn bg-red-400'
                        onClick={openDeleteModal}
                    >
                        Delete
                    </button>
                    <button
                        className='btn bg-blue-400'
                        onClick={navigateToTickets}
                    >
                        Tickets
                    </button>
                </div>
            </motion.div>
        </Backdrop>
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

const UserElements = ({ usersArr }: userProps) => {
    const groupUsers = useAppSelector((state) => state.group.users);

    const users = [];
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    return (
        <ul className='max-w-[100ch] max-h-[100px] overflow-auto overflow-x-hidden'>
            {users.map((user) => {
                return (
                    <li
                        key={user.username}
                        className='pl-4 text-xl'
                    >{`${user.firstName} ${user.lastName}`}</li>
                );
            })}
        </ul>
    );
};

export default ProjectInfoModal;
