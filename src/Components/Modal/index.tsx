import { AnimatePresence } from "framer-motion";
import React from "react";
import { useAppSelector } from "../../Hooks/hooks";
import DeleteMemberModal from "../../Routes/Administration/Components/DeleteMemberModal";
import EditMemberModal from "../../Routes/Administration/Components/EditMemberModal";
import AddProjectModal from "../../Routes/Dashboard/Components/AddProjectModal";
import DeleteProjectModal from "../../Routes/Dashboard/Components/DeleteProjectModal";
import EditProjectModal from "../../Routes/Dashboard/Components/EditProjectModal";
import AddTicketModal from "../../Routes/Project/Components/AddTicketModal";
import DeleteTicketModal from "../../Routes/Project/Components/DeleteTicketModal";
import EditTicketModal from "../../Routes/Project/Components/EditTicketModal";
import Backdrop from "../Backdrop";
import RemovedFromGroupModal from "../RemovedFromGroupModal/RemovedFromGroupModal";

const Modal = () => {
    const modal = useAppSelector((state) => state.modal);
    return (
        <AnimatePresence exitBeforeEnter={true} initial={false}>
            {modal.open && (
                <Backdrop>
                    {modal.type === "createProject" && (
                        <AddProjectModal></AddProjectModal>
                    )}
                    {modal.type === "updateProject" && modal.options && (
                        <EditProjectModal
                            projectId={modal.options?.projectId ?? ""}
                        ></EditProjectModal>
                    )}
                    {modal.type === "deleteProject" &&
                        modal.options.projectId && (
                            <DeleteProjectModal
                                projectId={modal.options?.projectId ?? ""}
                            ></DeleteProjectModal>
                        )}
                    {modal.type === "createTicket" && (
                        <AddTicketModal></AddTicketModal>
                    )}
                    {modal.type === "updateTicket" && (
                        <EditTicketModal
                            ticketId={modal.options?.ticketId ?? ""}
                        ></EditTicketModal>
                    )}
                    {modal.type === "deleteTicket" && (
                        <DeleteTicketModal
                            ticketId={modal.options?.ticketId ?? ""}
                        ></DeleteTicketModal>
                    )}
                    {modal.type === "editMember" && (
                        <EditMemberModal
                            username={modal.options.username ?? ""}
                        ></EditMemberModal>
                    )}

                    {modal.type === "removeMember" && (
                        <DeleteMemberModal
                            username={modal.options.username ?? ""}
                        ></DeleteMemberModal>
                    )}

                    {modal.type === "removedUserModal" && (
                        <RemovedFromGroupModal></RemovedFromGroupModal>
                    )}
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default Modal;
