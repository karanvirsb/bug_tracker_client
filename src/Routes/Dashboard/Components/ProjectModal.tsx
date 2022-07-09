import React from "react";
import Select from "react-select";

export interface IProject {
    groupId: string;
    projectName: string;
    projectDesc: string;
}

type options = {
    value: { id: string };
    label: string;
};

type props = {
    projectInput: IProject;
    setProjectInput: React.Dispatch<React.SetStateAction<IProject>>;
    type?: "edit";
    options: options[] | any;
    defaultSelect?: options[];
    refs?: React.MutableRefObject<null | any>;
};

const ProjectModal = ({
    projectInput,
    setProjectInput,
    type,
    options,
    defaultSelect,
    refs,
}: props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectInput((prev: IProject) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setProjectInput((prev: IProject) => {
            return { ...prev, projectDesc: e.target.value };
        });
    };

    // const selectedUsers = (users: any) => {
    //     const userIds = users.map(
    //         (user: { label: String; value: { id: number } }) => {
    //             return user.value.id.toString();
    //         }
    //     );
    //     setProjectInput((prev: IProject) => {
    //         return { ...prev, users: userIds };
    //     });
    // };

    return (
        <>
            <div className='flex flex-col gap-1'>
                <label htmlFor='projectName' className='text-xl md:text-lg'>
                    Project Name
                </label>
                <input
                    type='text'
                    id='projectName'
                    name='projectName'
                    value={projectInput.projectName}
                    onChange={handleChange}
                    className='outline outline-1 outline-gray-400 rounded-md ml-2 text-xl px-2 py-1 md:text-lg'
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='projectDesc' className='text-xl md:text-lg'>
                    Project Description
                </label>
                <textarea
                    id='projectDesc'
                    name='projectDesc'
                    value={projectInput.projectDesc}
                    onChange={handleTextAreaChange}
                    className='outline outline-1 outline-gray-400 rounded-md resize-y ml-2 text-xl px-2 py-1 md:text-lg'
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='users' className='text-xl md:text-lg'>
                    Select Users
                </label>
                <Select
                    options={options}
                    isMulti
                    ref={refs}
                    defaultValue={type}
                    className='outline-gray-400 border-none rounded-lg ml-2 text-xl md:text-lg'
                    closeMenuOnSelect={false}
                ></Select>
            </div>
        </>
    );
};

export default ProjectModal;
