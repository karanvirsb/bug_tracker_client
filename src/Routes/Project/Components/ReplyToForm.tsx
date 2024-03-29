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
    page?: number;
};

const ReplyToForm = ({
    repliedToUserId,
    comment,
    setReplying,
    page,
}: props) => {
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
                    socket.emit("invalidateCommentsPage", {
                        queryName: "comments" + ticketId,
                        roomId: ticketId,
                        page: page,
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
            <div className='flex sm:flex-col gap-4 justify-center items-end sm:items-start w-full'>
                <div className='flex w-full'>
                    <img
                        src={`data:${
                            user.avatar.contentType
                        };utf8,${encodeURIComponent(user.avatar.data)}`}
                        alt={user.username}
                        className='w-[50px] h-[50px] sm:w-[35px] sm:h-[35px]'
                    />
                    <input
                        className='border-b-[2px] border-b-gray-400 px-2 py-2 text-lg w-[100%] min-w-[150px] focus:outline-none'
                        type='text'
                        onChange={(e) => setReplyInput(e.target.value)}
                        value={replyInput}
                        ref={inputRef}
                    />
                </div>
                <div className='flex gap-4 sm:self-start'>
                    <button
                        className='btn bg-blue-500 font-semibold hover:outline hover:outline-blue-500'
                        type='submit'
                    >
                        Post
                    </button>
                    <button
                        type='button'
                        className='btn bg-red-400 font-semibold hover:outline hover:outline-red-400'
                        onClick={() => setReplying(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ReplyToForm;
