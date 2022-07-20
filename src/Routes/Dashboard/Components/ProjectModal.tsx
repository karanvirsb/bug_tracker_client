import React from "react";
import Select from "react-select";

export interface IProject {
    groupId: string;
    projectName: string;
    projectDesc: string;
}

type options = {
    value: string;
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
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Project Name
                </label>
                <input
                    type='text'
                    id='projectName'
                    name='projectName'
                    value={projectInput.projectName}
                    onChange={handleChange}
                    className='modal-input'
                />
            </div>
            <div className='input-container'>
                <label htmlFor='projectDesc' className='input-label'>
                    Project Description
                </label>
                <textarea
                    id='projectDesc'
                    name='projectDesc'
                    value={projectInput.projectDesc}
                    onChange={handleTextAreaChange}
                    className='modal-input resize-y'
                />
            </div>
            <div className='input-container'>
                <label htmlFor='users' className='input-label'>
                    Select Users
                </label>
                <Select
                    options={options}
                    isMulti
                    ref={refs}
                    defaultValue={type && defaultSelect}
                    className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                    closeMenuOnSelect={false}
                    maxMenuHeight={100}
                ></Select>
            </div>
        </>
    );
};

export default ProjectModal;
