import React, { useState } from "react";
import { IUser } from "../../../Redux/Slices/userSlice";

type props = {
    memberInput: IUser;
    setMemberInput: React.Dispatch<React.SetStateAction<IUser>>;
};

const MemberModal = ({ memberInput, setMemberInput }: props) => {
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
                        value={`admin`}
                        className='modal-input'
                    />
                    <label htmlFor='admin'>Admin</label>
                    <input
                        type='checkbox'
                        name='roles'
                        id='editor'
                        value='editor'
                        className='modal-input'
                    />
                    <label htmlFor='editor'>Editor</label>
                </div>
            </fieldset>
        </>
    );
};

export default MemberModal;
