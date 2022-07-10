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
            <form
                action=''
                className='bg-white flex flex-col justify-center items-center gap-4 p-4 rounded-md w-1/4 max-w-[350px] min-w-[250px] sm:w-[90%] h-1/4 min-h-[200px] max-h-[250px]'
            >
                <p className='text-center lg:text-xl m-md:text-lg'>
                    Are you sure you want to delete this project?
                </p>
                <div className='flex gap-2 sm:w-full sm:flex-col sm:items-stretch sm:px-16'>
                    <button className='btn bg-blue-400 !px-6'>Yes</button>
                    <button
                        className='btn bg-red-400 !px-6'
                        onClick={closeDeleteModal}
                    >
                        No
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default DeleteProjectModal;
