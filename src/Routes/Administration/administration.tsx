import React, { useState } from "react";
import Members from "./Components/Members";
import { useAppSelector } from "../../Hooks/hooks";

const Administration = () => {
    const group = useAppSelector((state) => state.persistedReducer.group);
    const [groupName, setGroupName] = useState(group.groupName);
    const [disableBtn, setDisableBtn] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== group.groupName) {
            setDisableBtn(false);
        } else {
            setDisableBtn(true);
        }
        setGroupName(e.target.value);
    };

    return (
        <section className='sections p-4'>
            <div className='mb-4'>
                <h1 className='text-2xl font-semibold mb-4'>Group</h1>
                <form action='' className='flex flex-col gap-4'>
                    <div className='input-container'>
                        <label htmlFor='groupName' className='input-label'>
                            Group Name
                        </label>
                        <input
                            type='text'
                            name='groupName'
                            id='groupName'
                            className='modal-input mx-4'
                            value={groupName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 w-1/3 min-w-max gap-4 md:grid-cols-1'>
                        <button
                            type='submit'
                            className='btn bg-blue-400 font-semibold hover:outline-2 hover:outline-blue-400 disabled:bg-zinc-400 disabled:hover:outline-none'
                            disabled={disableBtn}
                        >
                            Save Changes
                        </button>
                        <button
                            type='button'
                            className='btn bg-green-400 font-semibold hover:outline-2 hover:outline-green-400'
                        >
                            Refresh Invite Code
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className='text-xl font-semibold mb-4'>Members</h1>
                <div className='outline-[#D4D4D4] outline-1 outline p-4 text-left rounded-md mx-4'>
                    <table className='w-full'>
                        <thead className='text-sm text-gray-500 font-normal'>
                            <tr>
                                <th scope='col' className='px-6 py-3 sm:hidden'>
                                    {/* Avatar */}
                                </th>
                                <th scope='col' className='px-6 py-3 md:hidden'>
                                    USERNAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-3 sm:text-center'
                                >
                                    FULL NAME
                                </th>
                                <th scope='col' className='px-6 py-3 md:hidden'>
                                    EMAIL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <Members users={group.users}></Members>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Administration;
