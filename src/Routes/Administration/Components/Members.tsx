import { AnimatePresence, LayoutGroup } from "framer-motion";
import React, { lazy, Suspense, useState } from "react";
import Spinner from "../../../Components/Spinner";
import { IUser } from "../../../Redux/Slices/userSlice";
const MemberInfoModal = lazy(() => import("./MemberInfoModal"));

type props = {
    users: IUser[];
};

type memberProps = {
    user: IUser;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
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
                    return (
                        <Member
                            key={user.username}
                            user={user}
                            setSelectedId={setSelectedId}
                        ></Member>
                    );
                })}
                <AnimatePresence exitBeforeEnter>
                    {selectedId && (
                        <Suspense
                            fallback={
                                <tr>
                                    <td align='center' colSpan={99}>
                                        <Spinner></Spinner>
                                    </td>
                                </tr>
                            }
                        >
                            <tr>
                                <td>
                                    <MemberInfoModal
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    ></MemberInfoModal>
                                </td>
                            </tr>
                        </Suspense>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </>
    );
};

const Member = ({ user, setSelectedId }: memberProps): JSX.Element => {
    return (
        <tr
            className='border-gray-200 border-b-2 hover:bg-gray-200 cursor-pointer'
            key={user.username}
            onClick={() => setSelectedId(user.username)}
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
