import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setOpen, resetModal } from "../../../Redux/Slices/modalSlice";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import ProjectModal, { IProject } from "./ProjectModal";

const EditProjectModal = (props: { projectId: string }): JSX.Element => {
    const projects = useAppSelector((state) => state.projects.projects);
    const project = projects.find(
        (project) => project.projectId === props.projectId
    );

    const [projectInput, setProjectInput] = useState<IProject>({
        groupId: project?.groupId ?? "",
        projectName: project?.projectName ?? "",
        projectDesc: project?.projectDesc ?? "",
        users: project?.users ?? [],
    });
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const auth = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    type updatedProject = { projectId: string; updates: IProject };

    const options = [
        {
            value: { id: 1 },
            label: "Maria Brown",
        },
        {
            value: { id: 3 },
            label: "John Doe",
        },
    ];

    const mutation = useMutation((updatedProject: updatedProject) => {
        return axiosPrivate("/project", {
            method: "put",
            data: {
                id: updatedProject.projectId,
                updates: updatedProject.updates,
            },
            headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
    });

    // TODO
    const modalConstraints = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(resetModal());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        try {
            // mutating in order to invalidate query
            // TODO create function to invalidate for everyone
            mutation.mutateAsync(
                { projectId: props.projectId, updates: projectInput },
                {
                    onSuccess: () => {
                        // reset input
                        setProjectInput({
                            groupId: "",
                            projectName: "",
                            projectDesc: "",
                            users: [],
                        });
                        queryClient.invalidateQueries("projectIds");
                        // reset modal
                        dispatch(setOpen(false));
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
            className='bg-white min-h-[100vh] w-1/3 lg:w-3/6 md:w-3/4 sm:w-full fixed right-0'
            variants={modalConstraints}
        >
            <form
                action=''
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 w-full min-h-[100vh] p-4 justify-evenly'
            >
                {/* TODO default values */}
                <ProjectModal
                    setProjectInput={setProjectInput}
                    projectInput={projectInput}
                    options={options}
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

export default EditProjectModal;