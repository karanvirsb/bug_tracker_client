import React, { useState } from "react";
import { IUser } from "../../../Redux/Slices/userSlice";

type props = {
    memberInput: IUser;
    setMemberInput: React.Dispatch<React.SetStateAction<IUser>>;
    edit: boolean;
    setDisableBtn?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MemberModal = ({
    memberInput,
    setMemberInput,
    edit,
    setDisableBtn,
}: props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
    return (
        <>
            <div className='input-container'>
                <label htmlFor='username' className='input-label'>
                    Username
                </label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    className='modal-input'
                    value={edit ? memberInput.username : ""}
                    readOnly
                />
            </div>
            <div className='input-container'>
                <label htmlFor='firstName' className='input-label'>
                    First Name
                </label>
                <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    className='modal-input'
                    value={edit ? memberInput.firstName : ""}
                    readOnly
                />
            </div>
            <div className='input-container'>
                <label htmlFor='lastName' className='input-label'>
                    Last Name
                </label>
                <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='modal-input'
                    value={edit ? memberInput.lastName : ""}
                    readOnly
                />
            </div>
            <div className='input-container'>
                <label htmlFor='email' className='input-label'>
                    Email
                </label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    className='modal-input'
                    value={edit ? memberInput.email : ""}
                    readOnly
                />
            </div>
            <fieldset className='input-container'>
                <legend className='input-label'>Roles</legend>
                <div>
                    <input
                        type='checkbox'
                        name='isAdmin'
                        id='admin'
                        defaultChecked={memberInput.isAdmin}
                        className='modal-input'
                    />
                    <label htmlFor='admin'>Admin</label>
                    <input
                        type='checkbox'
                        name='roles'
                        id='editor'
                        defaultChecked={memberInput.isEditor}
                        className='modal-input'
                    />
                    <label htmlFor='editor'>Editor</label>
                </div>
            </fieldset>
        </>
    );
};

export default MemberModal;
