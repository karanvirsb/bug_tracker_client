import React, { lazy, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
const Project = lazy(() => import("./Project"));
const ProjectInfoModal = lazy(() => import("./ProjectInfoModal"));

export interface IProject {
    projectId: string;
    groupId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
}

const Projects = (props: { projects: IProject[] }): JSX.Element => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // get all users of each project

    return !props.projects ? (
        <tr className='w-full text-center text-lg '>
            <td colSpan={1000}>
                <p className='text-xl'>No results.</p>
                <p>Maybe try to create a project or reload the page.</p>
            </td>
        </tr>
    ) : (
        <>
            <LayoutGroup>
                {props?.projects?.map((project) => {
                    const dateCreated = new Date(project.dateCreated);
                    return (
                        <Project
                            key={project.projectId}
                            projectId={project.projectId}
                            projectName={project.projectName}
                            projectDesc={project.projectDesc}
                            dateCreated={dateCreated}
                            users={project.users}
                            setSelectedId={setSelectedId}
                        ></Project>
                    );
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <tr>
                            <td>
                                <ProjectInfoModal
                                    selectedId={selectedId}
                                    setSelectedId={setSelectedId}
                                ></ProjectInfoModal>
                            </td>
                        </tr>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

export default Projects;
