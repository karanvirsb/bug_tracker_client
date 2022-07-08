import { motion } from "framer-motion";

const Backdrop = ({ children }: any) => {
    const backdropConstraints = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <motion.div
            variants={backdropConstraints}
            initial='hidden'
            animate='visible'
            exit={"exit"}
            className={"bg-backdrop-bg fixed inset-0 z-50"}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
