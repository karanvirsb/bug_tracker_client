import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { resetModal } from "../../../Redux/Slices/modalSlice";

type props = {
    projectId: string;
};
const DeleteProjectModal = ({ projectId }: props) => {
    const dispatch = useDispatch();

    const closeDeleteModal = () => {
        dispatch(resetModal());
    };

    return (
        <motion.div className='flex justify-center items-center w-full h-full'>
            <form action='' className=''>
                <p>Are you sure you want to delete this project?</p>
                <button>Yes</button>
                <button onClick={closeDeleteModal}>No</button>
            </form>
        </motion.div>
    );
};

export default DeleteProjectModal;
