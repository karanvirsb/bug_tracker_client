import React from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import Backdrop from "../../../Components/Backdrop";
import { setModal } from "../../../Redux/Slices/modalSlice";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../../../Hooks/useIsAdmin";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};
const ProjectInfoModal = ({ selectedId, setSelectedId }: props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAdmin, isEditor } = useIsAdmin();
    const projects = useAppSelector((state) => state.projects.projects);
    const foundProject = projects.find(
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
                options: { projectId: foundProject?.projectId },
            })
        );
        setSelectedId(null);
    };

    const openDeleteModal = () => {
        dispatch(
            setModal({
                type: "deleteProject",
                open: true,
                options: { projectId: foundProject?.projectId },
            })
        );
        setSelectedId(null);
    };

    const navigateToTickets = () => {
        setSelectedId(null);
        navigate(`/project/${foundProject?.projectId}`);
    };

    return (
        <Backdrop onClick={() => setSelectedId(null)}>
            <motion.div
                className='bg-white flex flex-col flex-1 w-full max-w-[400px] max-h-[450px] min-h-max-content rounded-md'
                variants={projectInfoConstraint}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => e.stopPropagation()} // stop from bubbling up to the backdrop and closing
            >
                <div className='bg-gray-100 flex justify-between items-center p-4 rounded-t-md rounded-tr-md'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl'>
                            {foundProject?.projectName}
                        </h1>
                        <p className='text-gray-600'>
                            {new Date(
                                foundProject?.dateCreated ?? ""
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
                <div className='flex flex-col flex-grow justify-between gap-6 p-4'>
                    <div>
                        <h2 className='text-gray-500 text-lg'>Description:</h2>
                        <p className='max-w-[100ch] w-full text-lg max-h-[100px] overflow-auto outline outline-gray-200 outline-1 rounded-md p-4'>
                            {foundProject?.projectDesc}
                        </p>
                    </div>
                    <div>
                        <h2 className='text-gray-500 text-lg'>Users:</h2>
                        <UserElements
                            usersArr={foundProject?.users ?? []}
                        ></UserElements>
                    </div>
                    <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 justify-self-end'>
                        {(isAdmin || isEditor) && (
                            <>
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
                            </>
                        )}
                        <button
                            className='btn bg-blue-400'
                            onClick={navigateToTickets}
                        >
                            Tickets
                        </button>
                    </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};

type userProps = {
    usersArr: string[];
};

const UserElements = ({ usersArr }: userProps) => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );

    const users = [];
    // adding users who exist within the project
    for (const user of groupUsers) {
        if (usersArr.includes(user.username)) {
            users.push(user);
        }
    }

    return (
        <ul className='max-w-[100ch] max-h-[100px] overflow-auto overflow-x-hidden outline outline-gray-200 outline-1 rounded-md p-4'>
            {users.map((user) => {
                return (
                    <li
                        key={user.username}
                        className='flex justify-center items-center text-xl bg-gray-200 mb-2 last:mb-0 p-1 rounded-3xl w-full'
                    >{`${user.firstName} ${user.lastName}`}</li>
                );
            })}
        </ul>
    );
};

export default ProjectInfoModal;
