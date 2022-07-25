import { AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState } from "react";
import Spinner from "../../../Components/Spinner";
import { IUser } from "../../../Redux/Slices/userSlice";

type props = {
    users: IUser[];
};

type memberProps = {
    user: IUser;
};

const Members = ({ users }: props) => {
    const [selectedId, setSelectedId] = useState<null | string>(null);
    return (
        <>
            {!users && (
                <tr className='w-full text-center'>
                    <td colSpan={99}>
                        <Spinner></Spinner>
                    </td>
                </tr>
            )}
            <LayoutGroup>
                {users?.map((user) => {
                    return <Member key={user.username} user={user}></Member>;
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <tr>
                            <td>{/* TODO Member info modal */}</td>
                        </tr>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

const Member = ({ user }: memberProps): JSX.Element => {
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
                    };utf8,${encodeURIComponent(user.avatar.data)}`}
                    alt={user.firstName + " " + user.lastName + " avatar"}
                />
            </th>
            <td className='px-6 py-3 md:hidden'>{user.username}</td>
            <td className='px-6 py-3 sm:text-center'>
                {`${user.firstName} ${user.lastName}`}
            </td>
            <td className='px-6 py-3 md:hidden'>{user.email}</td>
        </tr>
    );
};

export default Members;
