import React, { lazy, Suspense } from "react";
const AnimatePresence = lazy(async () => {
    const { AnimatePresence } = await import("framer-motion");
    return { default: AnimatePresence };
});

import { useAppSelector } from "../../Hooks/hooks";
import Backdrop from "../Backdrop";
import Spinner from "../Spinner";
const DeleteMemberModal = lazy(
    () => import("../../Routes/Administration/Components/DeleteMemberModal")
);
const EditMemberModal = lazy(
    () => import("../../Routes/Administration/Components/EditMemberModal")
);
const AddProjectModal = lazy(
    () => import("../../Routes/Dashboard/Components/AddProjectModal")
);
const DeleteProjectModal = lazy(
    () => import("../../Routes/Dashboard/Components/DeleteProjectModal")
);
const EditProjectModal = lazy(
    () => import("../../Routes/Dashboard/Components/EditProjectModal")
);
const AddTicketModal = lazy(
    () => import("../../Routes/Project/Components/AddTicketModal")
);
const DeleteTicketModal = lazy(
    () => import("../../Routes/Project/Components/DeleteTicketModal")
);
const EditTicketModal = lazy(
    () => import("../../Routes/Project/Components/EditTicketModal")
);
const RemovedFromGroupModal = lazy(
    () => import("../RemovedFromGroupModal/RemovedFromGroupModal")
);

const Modal = () => {
    const classname = "!w-30 !h-30";
    const modal = useAppSelector((state) => state.modal);
    return (
        <AnimatePresence exitBeforeEnter={true} initial={false}>
            {modal.open && (
                <Backdrop>
                    {modal.type === "createProject" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <AddProjectModal></AddProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "updateProject" && modal.options && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <EditProjectModal
                                projectId={modal.options?.projectId ?? ""}
                            ></EditProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "deleteProject" && modal.options.projectId && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <DeleteProjectModal
                                projectId={modal.options?.projectId ?? ""}
                            ></DeleteProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "createTicket" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <AddTicketModal></AddTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "updateTicket" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <EditTicketModal
                                ticketId={modal.options?.ticketId ?? ""}
                            ></EditTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "deleteTicket" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <DeleteTicketModal
                                ticketId={modal.options?.ticketId ?? ""}
                            ></DeleteTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "editMember" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <EditMemberModal
                                username={modal.options.username ?? ""}
                            ></EditMemberModal>
                        </Suspense>
                    )}

                    {modal.type === "removeMember" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <DeleteMemberModal
                                username={modal.options.username ?? ""}
                            ></DeleteMemberModal>
                        </Suspense>
                    )}

                    {modal.type === "removedUserModal" && (
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner classname={classname}></Spinner>
                                </div>
                            }
                        >
                            <RemovedFromGroupModal></RemovedFromGroupModal>
                        </Suspense>
                    )}
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default Modal;
