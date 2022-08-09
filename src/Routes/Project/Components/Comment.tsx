import React, { lazy, Suspense, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import Spinner from "../../../Components/Spinner";
import { useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import { IUser } from "../../../Redux/Slices/userSlice";
const Replys = lazy(() => import("./Replys"));
const ReplyToForm = lazy(() => import("./ReplyToForm"));

type props = {
    comment: IComment;
    user: IUser;
    classname?: string;
};

const Comment = ({ comment, user, classname }: props) => {
    const [replying, setReplying] = useState(false); // if user is replying open form
    const [loadReplies, setLoadReplies] = useState(false); // load up the replies
    const [replys, setReplys] = useState<string[]>([]); // set replys to comment replys ids

    const topLevelComments = useAppSelector((state) => state.comments.comments);

    const dateCreated = new Date(comment?.dateCreated || "");
    const dateString = `${dateCreated.toLocaleDateString()} | ${dateCreated.toLocaleTimeString()}`;

    const deleteCommentMutation = useMutation(async (commentId: string) => {
        return axiosPrivate("/comment", {
            data: { commentId: commentId },
            method: "delete",
        });
    });

    const handleDelete = () => {
        deleteCommentMutation.mutateAsync(comment?.commentId || "", {
            onSuccess: () => {
                const foundTicketId = topLevelComments.find(
                    (elem) => elem.commentId === comment.repliedTo
                )?.ticketId;

                toast.success("Comment was deleted successfully");
                const ticketId = comment.ticketId || foundTicketId;
                socket.emit("invalidateQuery", {
                    queryName: "comments" + ticketId,
                    groupId: ticketId,
                });
            },
        });
    };

    useEffect(() => {
        if (comment.reply) {
            setReplys(comment.reply);
        }
    }, [comment.reply, comment]);

    return (
        <div className='flex flex-col w-[75%] px-4 outline outline-[1px] outline-blue-300 rounded-md'>
            <div className={classname}>
                <img
                    className='w-[40px] h-[40px]'
                    src={`data:${
                        user?.avatar.contentType
                    };utf8,${encodeURIComponent(
                        user?.avatar?.data ?? "image/svg+xml"
                    )}`}
                    alt=''
                />
                <div className='flex flex-col gap-3 flex-grow'>
                    <div className='flex gap-4'>
                        <p>{user?.username}</p>
                        <p>{dateString}</p>
                    </div>
                    <p>{comment.comment}</p>
                    <div>
                        <button onClick={() => setReplying(true)}>Reply</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    {!loadReplies && replys.length > 0 && comment?.ticketId && (
                        <button
                            className='text-center mt-2'
                            onClick={() => setLoadReplies(true)}
                        >
                            Load Replies
                        </button>
                    )}
                </div>
            </div>
            {replying && (
                <Suspense
                    fallback={
                        <div className='w-full flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    <ReplyToForm
                        repliedToUserId={comment.userId}
                        comment={comment}
                        setReplying={setReplying}
                    ></ReplyToForm>
                </Suspense>
            )}
            {/* Comments / replys */}
            {loadReplies && (
                <Suspense
                    fallback={
                        <div className='w-full flex justify-center items-center'>
                            <Spinner></Spinner>
                        </div>
                    }
                >
                    <Replys
                        replyIds={replys}
                        ticketId={comment.commentId || ""}
                    ></Replys>
                </Suspense>
            )}
        </div>
    );
};

export default Comment;
