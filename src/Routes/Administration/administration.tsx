import React from "react";
import Members from "./Components/Members";
import { useAppSelector } from "../../Hooks/hooks";

const Administration = () => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    return (
        <section className='sections'>
            <div>
                <h1 className='text-2xl font-semibold mb-4'>Group</h1>
                <form action=''>
                    <label htmlFor='groupName'></label>
                    <div>
                        <input type='text' name='groupName' id='groupName' />
                        <button type='submit'>Save Changes</button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className='text-2xl font-semibold mb-4'>Group Members</h1>
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
                            <Members users={groupUsers}></Members>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Administration;
