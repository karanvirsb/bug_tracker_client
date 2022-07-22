import React from "react";
import { useAppSelector } from "../../../Hooks/hooks";

const MembersTab = () => {
    const groupUsers = useAppSelector(
        (state) => state.persistedReducer.group.users
    );
    return (
        <>
            <h1 className='text-2xl font-semibold mb-4'>Members</h1>
            <table className='w-full outline outline-[1px] outline-gray-300 rounded-md text-left mx-4'>
                <thead className='text-sm text-gray-500 font-normal'>
                    <tr>
                        <th scope='col' className='px-6 py-3 sm:hidden'>
                            {/* Avatar */}
                        </th>
                        <th scope='col' className='px-6 py-3 md:hidden'>
                            USERNAME
                        </th>
                        <th scope='col' className='px-6 py-3 sm:text-center'>
                            FULL NAME
                        </th>
                        <th scope='col' className='px-6 py-3 md:hidden'>
                            EMAIL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {groupUsers.map((user) => {
                        return (
                            <tr
                                className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
                                key={user.username}
                            >
                                <th scope='row' className='px-6 py-3 sm:hidden'>
                                    <img
                                        className='w-[35px] h-[35px]'
                                        src={`data:${
                                            user.avatar.contentType
                                        };utf8,${encodeURIComponent(
                                            user.avatar.data
                                        )}`}
                                        alt={
                                            user.firstName +
                                            " " +
                                            user.lastName +
                                            " avatar"
                                        }
                                    />
                                </th>
                                <td className='px-6 py-3 md:hidden'>
                                    {user.username}
                                </td>
                                <td className='px-6 py-3 sm:text-center'>
                                    {`${user.firstName} ${user.lastName}`}
                                </td>
                                <td className='px-6 py-3 md:hidden'>
                                    {user.email}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default MembersTab;
