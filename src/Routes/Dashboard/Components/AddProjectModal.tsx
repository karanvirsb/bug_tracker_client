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

const AddProjectModal = (): JSX.Element => {
    const [projectInput, setProjectInput] = useState<IProject>({
        groupId: "",
        projectName: "",
        projectDesc: "",
    });

    const auth = useAppSelector((state) => state.auth);
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

    for (const user of groupUsers) {
        if (user.username !== auth.username) {
            options.push({
                value: user.username,
                label: `${user.firstName} ${user.lastName}`,
            });
        }
    }

    // mutation for creating a new project
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
        // run through the users that are selected apart of the Select component
        if (usersSelected.current) {
            selectedUsers =
                (usersSelected?.current as any).state?.selectValue.map(
                    (user: user) => {
                        return user.value;
                    }
                ) ?? [];
        }

        if (auth.username) {
            selectedUsers.push(auth?.username);
        }

        if (auth.group_id) {
            newProject = {
                groupId: auth?.group_id,
                projectName: projectInput.projectName,
                projectDesc: projectInput.projectDesc,
                users: selectedUsers,
            };
        }
        try {
            // mutating in order to invalidate query
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
            className='side-modal'
            variants={modalConstraints}
            initial='hidden'
            animate='visible'
            exit='exit'
        >
            <form action='' onSubmit={handleSubmit} className='side-modal-form'>
                <Suspense
                    fallback={
                        <div className='bg-white w-full rounded-lg flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    {/* TODO fixed value of user */}
                    <ProjectModal
                        setProjectInput={setProjectInput}
                        projectInput={projectInput}
                        options={options}
                        refs={usersSelected}
                    ></ProjectModal>
                    <div className='side-modal-btn-container'>
                        <button type='submit' className='btn submit-btn'>
                            Submit
                        </button>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='btn cancel-btn'
                        >
                            Cancel
                        </button>
                    </div>
                </Suspense>
            </form>
        </motion.div>
    );
};

export default AddProjectModal;
