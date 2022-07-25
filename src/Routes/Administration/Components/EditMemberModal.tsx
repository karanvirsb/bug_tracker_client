import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { resetModal, setOpen } from "../../../Redux/Slices/modalSlice";
import { IUser } from "../../../Redux/Slices/userSlice";
import MemberModal from "./MemberModal";

type props = {
    username: string;
};

const EditMemberModal = ({ username }: props) => {
    const [disableBtn, setDisableBtn] = useState(true);
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    const user = groupUsers.find((user) => user.username === username);
    const [memberInput, setMemberInput] = useState<IUser>({
        username: user?.username ?? "",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        avatar: user?.avatar ?? { data: "", contentType: "" },
        isAdmin: user?.isAdmin ?? false,
        isEditor: user?.isEditor ?? false,
    });

    const dispatch = useAppDispatch();

    const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
    const modalConstraints = {
        hidden: { opacity: 0, x: 1000, transition },
        visible: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 1000, transition: { duration: 1 } },
    };

    const closeModal = () => {
        dispatch(resetModal());
    };

    const handleSubmit = () => {};

    return (
        <motion.div
            className='bg-white min-h-[100vh] w-1/3 lg:w-3/6 md:w-3/4 sm:w-full fixed right-0 top-0 bottom-0 overflow-auto'
            variants={modalConstraints}
        >
            <form
                action=''
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 w-full min-h-[100vh] p-4 justify-evenly'
            >
                <MemberModal
                    setMemberInput={setMemberInput}
                    memberInput={memberInput}
                    edit={true}
                    setDisableBtn={setDisableBtn}
                ></MemberModal>
                <div className='flex justify-center items-center gap-2 md:flex-col md:items-stretch md:px-20 sm:px-0'>
                    <button
                        type='submit'
                        className='btn bg-blue-500 !px-8 disabled:bg-zinc-400 disabled:hover:outline-none'
                        disabled={disableBtn}
                    >
                        Submit
                    </button>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='btn bg-red-500 !px-6'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditMemberModal;
