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
    const classname = "!w-10 !h-10 !border-yellow-600";
    const modal = useAppSelector((state) => state.modal);
    return (
        <AnimatePresence exitBeforeEnter={true} initial={false}>
            {modal.open && (
                <Backdrop>
                    {modal.type === "createProject" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <AddProjectModal></AddProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "updateProject" && modal.options && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <EditProjectModal
                                projectId={modal.options?.projectId ?? ""}
                            ></EditProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "deleteProject" && modal.options.projectId && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <DeleteProjectModal
                                projectId={modal.options?.projectId ?? ""}
                            ></DeleteProjectModal>
                        </Suspense>
                    )}
                    {modal.type === "createTicket" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <AddTicketModal></AddTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "updateTicket" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <EditTicketModal
                                ticketId={modal.options?.ticketId ?? ""}
                            ></EditTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "deleteTicket" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <DeleteTicketModal
                                ticketId={modal.options?.ticketId ?? ""}
                            ></DeleteTicketModal>
                        </Suspense>
                    )}
                    {modal.type === "editMember" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <EditMemberModal
                                username={modal.options.username ?? ""}
                            ></EditMemberModal>
                        </Suspense>
                    )}

                    {modal.type === "removeMember" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
                        >
                            <DeleteMemberModal
                                username={modal.options.username ?? ""}
                            ></DeleteMemberModal>
                        </Suspense>
                    )}

                    {modal.type === "removedUserModal" && (
                        <Suspense
                            fallback={<Spinner classname={classname}></Spinner>}
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
