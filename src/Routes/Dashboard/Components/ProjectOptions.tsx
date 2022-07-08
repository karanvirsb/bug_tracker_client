import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../Redux/Slices/modalSlice";

type props = {
    projectId: string;
    setProjectOpen: any;
};

const ProjectOptions = ({ projectId, setProjectOpen }: props) => {
    // on click dispatch message for modal
    const dispatch = useDispatch();

    const openEditModal = () => {
        dispatch(
            setModal({
                type: "updateProject",
                open: true,
                options: { projectId: projectId },
            })
        );
        setProjectOpen(false);
    };

    const openDeleteModal = () => {};

    return (
        <div className='absolute '>
            <button onClick={openEditModal}>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default ProjectOptions;
