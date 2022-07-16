import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../Hooks/hooks";

type props = {
    selectedId: string;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};
const ProjectInfoModal = ({ selectedId, setSelectedId }: props) => {
    const projects = useAppSelector((state) => state.projects.projects);
    const project = projects.find(
        (project) => project.projectId === selectedId
    );

    return (
        <motion.div>
            <motion.div>
                <div>
                    <div>
                        <h1>{project?.projectName}</h1>
                        <p>
                            {new Date(
                                project?.dateCreated ?? ""
                            ).toDateString()}
                        </p>
                    </div>
                    {/* close button */}
                </div>
                <p>{project?.projectDesc}</p>
                <UserElements usersArr={project?.users ?? []}></UserElements>
            </motion.div>
        </motion.div>
    );
};

type user = {
    username: String;
    email: String;
    firstName: String;
    lastName: String;
};

type userProps = {
    usersArr: string[];
};

type userElementProps = {
    users: user[];
};
const UserElements = ({ usersArr }: userProps) => {
    const groupUsers = useAppSelector((state) => state.group.users);

    const users = [];
    for (let i = 0; i < groupUsers.length; i++) {
        if (usersArr.includes(groupUsers[i].username)) {
            users.push(groupUsers[i]);
        }
    }

    return (
        <ul>
            {users.map((user) => {
                return <li>{`${user.firstName} ${user.lastName}`}</li>;
            })}
        </ul>
    );
};

export default ProjectInfoModal;
