import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setOpen, resetModal } from "../../../Redux/Slices/modalSlice";
import { useMutation } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import ProjectModal, { IProject } from "./ProjectModal";
import socket from "../../../API/sockets";

const AddProjectModal = (): JSX.Element => {
    const [projectInput, setProjectInput] = useState<IProject>({
        groupId: "",
        projectName: "",
        projectDesc: "",
    });

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const dispatch = useAppDispatch();
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const usersSelected = useRef(null);
    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const modalConstraints = {
        hidden: { opacity: 0, x: 1000, transition },
        visible: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 1000, transition: { duration: 1 } },
    };
    // creating the users of the group
    const options = [];

    for (let i = 0; i < groupUsers.length; i++) {
        if (groupUsers[i].username !== auth.username) {
            options.push({
                value: groupUsers[i].username,
                label: `${groupUsers[i].firstName} ${groupUsers[i].lastName}`,
            });
        }
    }

    const mutation = useMutation((newProject: IProject | {}) => {
        return axiosPrivate("/project", {
            method: "post",
            data: newProject,
        });
    });

    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        let newProject: IProject | {} = {};
        let selectedUsers;
        type user = {
            value: string;
            label: string;
        };
        if (usersSelected.current) {
            selectedUsers =
                (usersSelected?.current as any).state?.selectValue.map(
                    (user: user) => {
                        return user.value;
                    }
                ) ?? [];
        }
        const users = selectedUsers;

        if (auth.username) {
            users.push(auth?.username);
        }

        if (auth.group_id) {
            newProject = {
                groupId: auth?.group_id,
                projectName: projectInput.projectName,
                projectDesc: projectInput.projectDesc,
                users: users,
            };
        }
        try {
            // mutating in order to invalidate query
            // TODO create function to invalidate for everyone
            mutation.mutateAsync(newProject, {
                onSuccess: () => {
                    // reset input
                    setProjectInput({
                        groupId: "",
                        projectName: "",
                        projectDesc: "",
                    });
                    socket.emit("invalidateQuery", {
                        queryName: "projectIds",
                        groupId: auth.group_id,
                    });
                    // reset modal
                    dispatch(resetModal());
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        const errorResp = JSON.parse(
                            error.response?.data.message
                        );
                        errorResp.forEach(
                            (elem: {
                                code: string;
                                inclusive: boolean;
                                message: string;
                                minimum?: number;
                                maxiumum?: number;
                                path: string[];
                                type: string;
                            }) => {
                                toast.error(elem.path[0] + " " + elem.message);
                            }
                        );
                    }
                },
            });
        } catch (error: any) {
            if (error instanceof AxiosError) {
                console.log(JSON.parse(error.response?.data.message));
                toast.error(JSON.parse(error.response?.data.message));
            }
            console.log(error);
        }
    };

    return (
        <motion.div
            className='bg-white min-h-[100vh] w-1/3 lg:w-3/6 md:w-3/4 sm:w-full fixed right-0 top-0 bottom-0 overflow-auto'
            variants={modalConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form
                action=''
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 w-full min-h-[100vh] p-4 justify-evenly'
            >
                {/* TODO fixed value of user */}
                <ProjectModal
                    setProjectInput={setProjectInput}
                    projectInput={projectInput}
                    options={options}
                    refs={usersSelected}
                ></ProjectModal>
                <div className='flex justify-center items-center gap-2 md:flex-col md:items-stretch md:px-20 sm:px-0'>
                    <button type='submit' className='btn bg-blue-500 !px-8'>
                        Submit
                    </button>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='btn bg-red-500 !px-6'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddProjectModal;
