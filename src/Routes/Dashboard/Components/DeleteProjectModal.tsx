import { motion } from "framer-motion";

type props = {
    projectId: string;
};
const DeleteProjectModal = ({ projectId }: props) => {
    return (
        <motion.div>
            <p>Are you sure you want to delete this project?</p>
            <button>Yes</button>
            <button>No</button>
        </motion.div>
    );
};

export default DeleteProjectModal;
