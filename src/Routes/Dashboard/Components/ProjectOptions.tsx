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
        <div className='absolute right-[100%] top-[50%] translate-y-[-50%] bg-white rounded-md z-40 outline outline-2 outline-gray-400 flex flex-col gap-2 p-1'>
            <button onClick={openEditModal} className='btn bg-blue-400'>
                Edit
            </button>
            <button className='btn bg-red-400'>Delete</button>
        </div>
    );
};

export default ProjectOptions;
