import React, { lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import ErrorFallbackWithoutRetry from "../../../Components/ErrorFallback/ErrorFallbackWithoutRetry";
import Spinner from "../../../Components/Spinner";
import { useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import { IUser } from "../../../Redux/Slices/userSlice";
import useCheckTicketPermissions from "../Hooks/useCheckTicketPermissions";
const Replys = lazy(() => import("./Replys"));
const ReplyToForm = lazy(() => import("./ReplyToForm"));

type props = {
    comment: IComment;
    user: IUser;
    classname?: string;
    isReply?: boolean;
    page?: number;
};

const Comment = ({ comment, user, classname, isReply, page }: props) => {
    const dateCreated = new Date(comment?.dateCreated || "");
    const dateString = `${dateCreated.toLocaleDateString()} | ${dateCreated.toLocaleTimeString()}`;

    const [replying, setReplying] = useState(false); // if user is replying open form
    const [loadReplies, setLoadReplies] = useState(false); // load up the replies
    const [replys, setReplys] = useState<string[]>([]); // set replys to comment replys ids
    const [readMore, setReadMore] = useState(false); // if the use wants to load more of the comment

    const topLevelComments = useAppSelector((state) => state.comments.comments);
    const loginUser = useAppSelector((state) => state.persistedReducer.user);

    const { checkUserPermissions } = useCheckTicketPermissions();
    let isUserAllowed = false;
    // finding the top level comments ticketId to use for comment updates
    const foundTicketId = topLevelComments.find(
        (elem) => elem.commentId === comment.repliedTo
    )?.ticketId;

    if (isReply) {
        isUserAllowed = checkUserPermissions({
            ticketId: foundTicketId,
        });
    } else {
        isUserAllowed = checkUserPermissions({
            ticketId: comment.ticketId,
        });
    }

    const deleteCommentMutation = useMutation(async (commentId: string) => {
        return axiosPrivate("/comment", {
            data: { commentId: commentId },
            method: "delete",
        });
    });

    const handleDelete = () => {
        deleteCommentMutation.mutateAsync(comment?.commentId || "", {
            onSuccess: () => {
                toast.success("Comment was deleted successfully");
                const ticketId = comment.ticketId || foundTicketId;
                if (isReply) {
                    socket.emit("invalidateCommentsPage", {
                        queryName: "comments" + ticketId,
                        roomId: ticketId,
                        page: page,
                    });
                } else {
                    socket.emit("deleteCommentFromState", {
                        roomId: ticketId,
                        comment: comment.commentId,
                    });
                }
            },
        });
    };

    useEffect(() => {
        if (comment.reply) {
            setReplys(comment.reply);
        }
    }, [comment.reply, comment]);

    return (
        <div
            className={`flex flex-col ${
                isReply ? "w-[100%] ml-4 border-r-0" : "w-[75%]"
            } md:w-[100%] px-4 border-x-[2px] border-blue-300`}
        >
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
                <div className='w-full flex flex-col gap-3 flex-grow'>
                    <div className='flex gap-4'>
                        <p className='text-black font-semibold'>
                            {user?.username}
                        </p>
                        <p className='text-gray-500'>{dateString}</p>
                    </div>
                    <p
                        className={`w-full text-lg ${
                            !readMore
                                ? "truncate text-ellipsis max-w-[60ch]"
                                : ""
                        }`}
                    >
                        {comment.comment}
                    </p>
                    {comment.comment.length > 60 &&
                        (!readMore ? (
                            <span
                                className='cursor-pointer font-semibold w-max hover:text-blue-500'
                                onClick={() => setReadMore(true)}
                            >
                                Read More
                            </span>
                        ) : (
                            <span
                                className='cursor-pointer font-semibold  w-max hover:text-blue-500'
                                onClick={() => setReadMore(false)}
                            >
                                Show Less
                            </span>
                        ))}
                    <div className='flex flex-row gap-4'>
                        {isUserAllowed && (
                            <button
                                className='text-lg hover:text-blue-500'
                                onClick={() => setReplying(true)}
                            >
                                Reply
                            </button>
                        )}
                        {/* checking to see if the user that made the comment is the same user that is logged in */}
                        {loginUser.username === user.username && (
                            <button
                                className='text-lg hover:text-red-400'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    {!loadReplies && replys.length > 0 && comment?.ticketId && (
                        <button
                            className='font-semibold text-center mt-2 hover:text-blue-500'
                            onClick={() => setLoadReplies(true)}
                        >
                            Load Replies
                        </button>
                    )}
                </div>
            </div>
            {replying && (
                <ErrorBoundary
                    fallback={
                        <ErrorFallbackWithoutRetry text='Error: Could not load reply form.'></ErrorFallbackWithoutRetry>
                    }
                >
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
                            page={page}
                        ></ReplyToForm>
                    </Suspense>
                </ErrorBoundary>
            )}
            {/* Comments / replys */}
            {loadReplies && (
                <ErrorBoundary
                    fallback={
                        <ErrorFallbackWithoutRetry text='Error: Could not load replies'></ErrorFallbackWithoutRetry>
                    }
                >
                    <Suspense
                        fallback={
                            <div className='w-full flex justify-center items-center'>
                                <Spinner></Spinner>
                            </div>
                        }
                    >
                        <Replys
                            replyIds={replys}
                            commentId={comment.commentId || ""}
                        ></Replys>
                    </Suspense>
                </ErrorBoundary>
            )}
        </div>
    );
};

export default Comment;
