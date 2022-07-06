import React from "react";

const Projects = (): JSX.Element => {
    // TODO query all the data of project given groupId
    const projects = [
        {
            id: "1",
            title: "Bug Tracker",
            description:
                " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit iste beatae recusandae et accusamus, rem iure, iusto alias consectetur odit dicta repellat corporis, tenetur quasi enim aspernatur molestias impedit consequuntur! Obcaecati",
            dateCreated: "2022-01-20",
            members: "Marin Kar, Lar Far",
        },
    ];
    return (
        <>
            {projects.map((project) => {
                return (
                    <tr className='border-gray-200 border-b-2' key={project.id}>
                        <th
                            scope='row'
                            className='px-6 py-3 text-gray-800 font-semibold'
                        >
                            {project.title}
                        </th>
                        <td className='truncate max-w-[15ch] px-6 py-3'>
                            {project.description}
                        </td>
                        <td className='px-6 py-3'>{project.dateCreated}</td>
                        <td className='px-6 py-3'>{project.members}</td>
                        <td className='px-1 py-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                />
                            </svg>
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default Projects;
