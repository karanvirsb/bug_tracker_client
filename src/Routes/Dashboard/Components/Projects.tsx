import Project from "./Project";

export interface IProject {
    projectId: string;
    groupId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
}

const Projects = (props: { projects: IProject[] }): JSX.Element => {
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
                    ></Project>
                );
            })}
        </>
    );
};

export default Projects;
