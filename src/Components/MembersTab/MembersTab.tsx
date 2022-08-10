import React from "react";
import { IUser } from "../../Redux/Slices/userSlice";
import Spinner from "../Spinner";

type props = {
    users: IUser[];
};

const MembersTab = ({ users }: props) => {
    return (
        <>
            {/* <h1 className='text-2xl font-semibold mb-4'>Members</h1> */}
            <div className='table_container mx-4 my-6'>
                <table className='w-full'>
                    <thead className='table_header'>
                        <tr>
                            <th scope='col' className='table_padding sm:hidden'>
                                {/* Avatar */}
                            </th>
                            <th scope='col' className='table_padding md:hidden'>
                                USERNAME
                            </th>
                            <th
                                scope='col'
                                className='table_padding sm:text-center'
                            >
                                FULL NAME
                            </th>
                            <th scope='col' className='table_padding md:hidden'>
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
                                    className='table_row_hover'
                                    key={user.username}
                                >
                                    <th
                                        scope='row'
                                        className='table_padding sm:hidden'
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
                                    <td className='table_padding md:hidden'>
                                        {user.username}
                                    </td>
                                    <td className='table_padding sm:text-center'>
                                        {`${user.firstName} ${user.lastName}`}
                                    </td>
                                    <td className='table_padding md:hidden'>
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
