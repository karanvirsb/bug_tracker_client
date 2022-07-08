import React, { useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setOpen, resetModal } from "../../../Redux/Slices/modalSlice";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface IProject {
    groupId: string;
    projectName: string;
    projectDesc: string;
    users: string[];
}

const AddProjectModal = (): JSX.Element => {
    const [projectInput, setProjectInput] = useState<IProject>({
        groupId: "",
        projectName: "",
        projectDesc: "",
        users: [],
    });
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const mutation = useMutation((newProject: IProject | {}) => {
        return axiosPrivate("/project", {
            method: "post",
            data: newProject,
            headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
    });

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newProject: IProject | {} = {};
        const users = [...projectInput.users];

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
            mutation.mutateAsync(newProject, {
                onSuccess: () => {
                    setProjectInput({
                        groupId: "",
                        projectName: "",
                        projectDesc: "",
                        users: [],
                    });
                    queryClient.invalidateQueries("projectIds");
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

    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(resetModal());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const selectedUsers = (users: any) => {
        const userIds = users.map(
            (user: { label: String; value: { id: number } }) => {
                return user.value.id.toString();
            }
        );
        setProjectInput((prev) => {
            return { ...prev, users: userIds };
        });
    };

    return (
        <motion.div>
            <form action='' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='projectName'>Project Name</label>
                    <input
                        type='text'
                        id='projectName'
                        name='projectName'
                        value={projectInput.projectName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='projectDesc'>Project Description</label>
                    <input
                        type='text'
                        id='projectDesc'
                        name='projectDesc'
                        value={projectInput.projectDesc}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='users'>Select Users</label>
                    <Select
                        closeMenuOnSelect={false}
                        options={options}
                        isMulti
                        name='users'
                        id='users'
                        onChange={(e) => {
                            selectedUsers(e);
                        }}
                    ></Select>
                </div>

                <div>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddProjectModal;
