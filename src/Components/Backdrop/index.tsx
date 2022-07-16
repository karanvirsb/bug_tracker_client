import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }: any) => {
    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const backdropConstraints = {
        hidden: { opacity: 0, transition },
        visible: { opacity: 1, transition },
        exit: { opacity: 0, transition },
    };

    return (
        <motion.div
            variants={backdropConstraints}
            initial='hidden'
            animate='visible'
            exit={"exit"}
            className={
                "bg-backdrop-bg fixed inset-0 flex justify-center items-center flex-col"
            }
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
