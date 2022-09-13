import React from "react";
import Checkbox from "../../../Components/Checkbox/Checkbox";
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
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setDisableBtn) {
            setDisableBtn(false);
        }
        setMemberInput((prev) => {
            return { ...prev, [e.target.name]: e.target.checked };
        });
    };
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
                <div className='flex justify-center items-center gap-4 md:flex-col'>
                    <Checkbox
                        text='Admin'
                        defaultChecked={memberInput.isAdmin}
                        id='admin'
                        name='isAdmin'
                        onChange={handleCheckBoxChange}
                    ></Checkbox>
                    <Checkbox
                        text='Editor'
                        defaultChecked={memberInput.isEditor}
                        id='editor'
                        name='isEditor'
                        onChange={handleCheckBoxChange}
                    ></Checkbox>
                </div>
            </fieldset>
        </>
    );
};

export default MemberModal;
