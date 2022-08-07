import React, { useState, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setOpen, resetModal } from "../../../Redux/Slices/modalSlice";
import { useMutation } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
const ProjectModal = lazy(() => import("./ProjectModal"));
import { IProject } from "./ProjectModal";
import socket from "../../../API/sockets";
import Spinner from "../../../Components/Spinner";

const EditProjectModal = (props: { projectId: string }): JSX.Element => {
    const projects = useAppSelector((state) => state.projects.projects);
    const foundProject = projects.find(
        (project) => project.projectId === props.projectId
    );

    const [projectInput, setProjectInput] = useState<IProject>({
        groupId: foundProject?.groupId ?? "",
        projectName: foundProject?.projectName ?? "",
        projectDesc: foundProject?.projectDesc ?? "",
    });

    const auth = useAppSelector((state) => state.persistedReducer.auth);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const dispatch = useAppDispatch();

    const usersSelected = useRef(null);
    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const modalConstraints = {
        hidden: { opacity: 0, x: 1000, transition },
        visible: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 1000, transition: { duration: 1 } },
    };

    const options = [];
    const defaultSelectValue = [];
    // adding members that are apart of the group
    for (const user of groupUsers) {
        options.push({
            value: user.username,
            label: `${user.firstName} ${user.lastName}`,
        });

        // adding members that are already selected
        if (foundProject?.users.includes(user.username)) {
            defaultSelectValue.push({
                value: user.username,
                label: `${user.firstName} ${user.lastName}`,
            });
        }
    }

    type updatedProject = { projectId: string; updates: IProject };
    const mutation = useMutation((updatedProject: updatedProject) => {
        return axiosPrivate("/project", {
            method: "put",
            data: {
                id: updatedProject.projectId,
                updates: updatedProject.updates,
            },
        });
    });

    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        try {
            let selectedUsers;
            type user = {
                value: string;
                label: string;
            };

            // getting users back from react-select
            if (usersSelected.current) {
                selectedUsers =
                    (usersSelected?.current as any).state?.selectValue.map(
                        (user: user) => {
                            return user.value;
                        }
                    ) ?? [];
            }
            const updates = { ...projectInput, users: selectedUsers };

            // mutating in order to invalidate query
            mutation.mutateAsync(
                { projectId: props.projectId, updates: updates },
                {
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
                                    toast.error(
                                        elem.path[0] + " " + elem.message
                                    );
                                }
                            );
                        }
                    },
                }
            );
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
        >
            <form
                action=''
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 w-full min-h-[100vh] p-4 justify-evenly'
            >
                <Suspense
                    fallback={
                        <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    <ProjectModal
                        setProjectInput={setProjectInput}
                        projectInput={projectInput}
                        options={options}
                        defaultSelect={defaultSelectValue}
                        refs={usersSelected}
                        type={"edit"}
                    ></ProjectModal>
                </Suspense>
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

export default EditProjectModal;
