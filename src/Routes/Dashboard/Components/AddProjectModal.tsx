import React, { useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setOpen, resetModal } from "../../../Redux/Slices/modalSlice";
import { useQueryClient } from "react-query";

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
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

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
        queryClient.invalidateQueries("projectIds");
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
