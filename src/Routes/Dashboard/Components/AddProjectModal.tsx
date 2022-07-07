import React, { useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../Hooks/hooks";
import {
    setModal,
    setOpen,
    resetModal,
} from "../../../Redux/Slices/modalSlice";

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
        console.log(e.target);
    };

    const closeModal = () => {
        dispatch(setOpen(false));
        dispatch(resetModal());
    };

    return (
        <motion.div>
            <form action='' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='projectName'>Project Name</label>
                    <input type='text' id='projectName' name='projectName' />
                </div>
                <div>
                    <label htmlFor='projectDesc'>Project Description</label>
                    <input type='text' id='projectDesc' name='projectDesc' />
                </div>
                <div>
                    <label htmlFor='users'>Select Users</label>
                    <Select
                        closeMenuOnSelect={false}
                        options={options}
                        isMulti
                        name='users'
                        id='users'
                        form='projectUsers'
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
