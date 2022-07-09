import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../Redux/Slices/modalSlice";

type props = {
    projectId: string;
    setProjectOpen: any;
    refs: typeof useRef;
};

const ProjectOptions = ({ projectId, setProjectOpen, refs }: props) => {
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
        <div
            className='absolute right-[100%] top-[50%] translate-y-[-50%] bg-white rounded-md z-40 outline outline-2 outline-gray-400 flex flex-col gap-2 p-1'
            ref={refs}
        >
            <button className='btn bg-blue-400' onClick={openEditModal}>
                Edit
            </button>
            <button className='btn bg-red-400' onClick={openDeleteModal}>
                Delete
            </button>
        </div>
    );
};

export default ProjectOptions;
