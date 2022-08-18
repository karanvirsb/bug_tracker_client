import React, { useRef, useState, useEffect } from "react";
import { useMutation } from "react-query";
import socket from "../../API/sockets";
import { useAppSelector } from "../../Hooks/hooks";
import useLogout from "../../Hooks/useLogout";
import axiosPrivate from "../AxiosInterceptors";

type dropDownProps = {
    inviteCode: string;
    componentRef: typeof useRef;
};

type deleteMemberMutationType = {
    username: string;
    groupId: string;
};

const GroupDropDown = ({ inviteCode, componentRef }: dropDownProps) => {
    const [copied, setCopied] = useState(false);
    const copyInviteCode = () => {
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
    };

    const logout = useLogout();

    const user = useAppSelector((state) => state.persistedReducer.user);
    const group = useAppSelector((state) => state.persistedReducer.group);

    const deleteMemberMutation = useMutation(
        async ({ username, groupId }: deleteMemberMutationType) => {
            const resp = await axiosPrivate("/user/group", {
                method: "delete",
                data: { username: username, groupId: groupId },
            });
            return resp.data;
        }
    );

    const removeFromGroup = () => {
        deleteMemberMutation.mutateAsync(
            { username: user.username, groupId: group.groupId },
            {
                onSuccess: () => {
                    logout();
                    // invalidate the group info
                    socket.emit("invalidateQuery", {
                        queryName: "groupInfo",
                        groupId: group.groupId,
                    });

                    // invalidate group users to refresh them
                    socket.emit("invalidateQuery", {
                        queryName: "groupUsers",
                        groupId: group.groupId,
                    });
                },
            }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => [setCopied(false)], 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [copied]);

    return (
        <div
            className='absolute bg-white text-black p-1 z-10 rounded-md w-full'
            ref={componentRef}
        >
            <p
                className='flex justify-center items-center border-b border-b-gray-300 cursor-pointer relative min-h-[50px] rounded hover:outline hover:outline-1 hover:outline-black'
                onClick={copyInviteCode}
            >
                {inviteCode}
                {copied && (
                    <span className='absolute translate-x-[0%] translate-y-[110%] bg-gray-600 text-white p-3 rounded-md'>
                        Copied
                    </span>
                )}
            </p>
            <button
                className='btn bg-secondary-color text-white !w-full !rounded-sm hover:text-black hover:outline hover:outline-2 hover:outline-black mt-2'
                onClick={removeFromGroup}
            >
                Leave Group
            </button>
        </div>
    );
};

export default GroupDropDown;
