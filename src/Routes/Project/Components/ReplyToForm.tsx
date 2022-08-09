import React, { useEffect, useRef, useState } from "react";
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
    const topLevelComments = useAppSelector((state) => state.comments.comments);
    const inputRef = useRef<null | HTMLInputElement>(null);
    const replyMutation = useMutation(
        async ({
            commentInfo,
            replyId,
        }: {
            commentInfo: IComment;
            replyId: string;
        }) => {
            return axiosPrivate("/comment/reply", {
                method: "post",
                data: { commentId: replyId, reply: commentInfo },
            });
        }
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let repliedTo = "";
        // checking if the comment is a reply or top level
        if (comment.repliedTo) {
            // if its a reply it will have repliedTo the top level
            repliedTo = comment.repliedTo;
        } else {
            // otherwise get the commentId and add it to repliedTo
            if (comment.commentId) repliedTo = comment?.commentId;
        }

        const ticketId = topLevelComments.find(
            (comment) => comment.commentId === repliedTo
        )?.ticketId;

        const reply: IComment = {
            userId: user.username,
            comment: replyInput,
            repliedTo: repliedTo,
        };

        replyMutation.mutateAsync(
            { commentInfo: reply, replyId: repliedTo },
            {
                onSuccess: () => {
                    toast.success("Replied Successfully");
                    socket.emit("invalidateQuery", {
                        queryName: "comments" + ticketId,
                        groupId: ticketId,
                    });
                    setReplying(false);
                    setReplyInput("");
                },
            }
        );
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <form
            className='my-4 w-[100%] min-w-[250px] max-w-[1100px] '
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
                    ref={inputRef}
                />
                <div>
                    <button
                        className='outline outline-[1px] outline-black px-4 py-2 w-24'
                        type='submit'
                    >
                        Post
                    </button>
                    <button>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default ReplyToForm;
