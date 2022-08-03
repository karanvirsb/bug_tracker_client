import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";

type props = {
    repliedToUserId: string;
    comment: IComment;
    setReplying: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReplyToForm = ({ repliedToUserId, comment, setReplying }: props) => {
    const [replyInput, setReplyInput] = useState(`@${repliedToUserId} `);
    const user = useAppSelector((state) => state.persistedReducer.user);

    const replyMutation = useMutation(async (commentInfo: IComment) => {
        return await axiosPrivate("/comment/reply", {
            method: "post",
            data: { commentId: comment?.commentId, reply: commentInfo },
        });
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const reply: IComment = {
            userId: user.username,
            comment: replyInput,
        };

        replyMutation.mutateAsync(reply, {
            onSuccess: () => {
                toast.success("Replied Successfully");
                socket.emit("invalidateQuery", {
                    queryName: "comments" + comment.ticketId,
                    groupId: comment.ticketId,
                });
                setReplying(false);
                setReplyInput("");
            },
        });
    };
    return (
        <form
            className='mt-4 w-[100%] min-w-[250px] max-w-[1100px] '
            onSubmit={handleSubmit}
        >
            <div className='flex gap-4 justify-center items-end w-full'>
                <img
                    src={`data:${
                        user.avatar.contentType
                    };utf8,${encodeURIComponent(user.avatar.data)}`}
                    alt={user.username}
                    className='w-[50px] h-[50px]'
                />
                <input
                    className='border-b-[2px] border-b-gray-400 px-2 py-2 text-lg w-[75%] min-w-[250px] max-w-[1250px] focus:outline-none'
                    type='text'
                    onChange={(e) => setReplyInput(e.target.value)}
                    value={replyInput}
                />
                <button
                    className='outline outline-[1px] outline-black px-4 py-2 w-24'
                    type='submit'
                >
                    Post
                </button>
            </div>
        </form>
    );
};

export default ReplyToForm;
