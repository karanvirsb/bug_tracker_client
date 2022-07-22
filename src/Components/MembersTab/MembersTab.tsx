import React from "react";
import { IUser } from "../../Redux/Slices/userSlice";
import Spinner from "../Spinner";

type props = {
    users: IUser[];
};

const MembersTab = ({ users }: props) => {
    return (
        <>
            <h1 className='text-2xl font-semibold mb-4'>Members</h1>
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
                        {!users && (
                            <tr className='w-full text-center'>
                                <td colSpan={99}>
                                    <Spinner></Spinner>
                                </td>
                            </tr>
                        )}
                        {users?.map((user) => {
                            return (
                                <tr
                                    className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
                                    key={user.username}
                                >
                                    <th
                                        scope='row'
                                        className='px-6 py-3 sm:hidden'
                                    >
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
            </div>
        </>
    );
};

export default MembersTab;
