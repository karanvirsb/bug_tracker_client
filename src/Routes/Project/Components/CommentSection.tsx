import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { QueryClient, useInfiniteQuery, useMutation } from "react-query";
import { setComments } from "../../../Redux/Slices/commentsSlice";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import Comments from "./Comments";
import { toast } from "react-toastify";
import socket from "../../../API/sockets";
import { useParams } from "react-router-dom";

type props = {
    ticketId: string;
};

type fetchCommentSectionType = {
    page: number;
};

const CommentSection = ({ ticketId }: props) => {
    const [loadComments, setLoadComments] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentInput, setCommentInput] = useState("");
    const user = useAppSelector((state) => state.persistedReducer.user);
    const ticketComments = useAppSelector((state) => state.comments.comments);
    const { projectId } = useParams();
    const dispatch = useAppDispatch();

    const fetchCommentSection = async ({ page }: fetchCommentSectionType) => {
        const resp = await axiosPrivate("/comment/tickets/" + ticketId, {
            method: "GET",
            params: { page: page, limit: 10 },
        });
        return resp.data;
    };

    const {
        data: comments,
        error,
        fetchNextPage,
        isFetching,
        status: commentsStatus,
    } = useInfiniteQuery(
        "comments" + ticketId,
        () => fetchCommentSection({ page: currentPage }),
        {
            getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        }
    );

    const postCommentMutation = useMutation(async (commentInfo: IComment) => {
        return await axiosPrivate("/comment", {
            method: "post",
            data: commentInfo,
        });
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const comment: IComment = {
            userId: user.username,
            ticketId: ticketId,
            comment: commentInput,
        };

        postCommentMutation.mutateAsync(comment, {
            onSuccess: () => {
                socket.emit("invalidateQuery", {
                    queryName: "comments" + ticketId,
                    groupId: ticketId,
                });

                toast.success("Commment has been posted");

                setCommentInput("");
            },
        });
    };

    useEffect(() => {
        if (commentsStatus === "success") {
            const fetchedComments: IComment[] = comments.pages;
            dispatch(setComments((fetchedComments[0] as any).docs));
        }
    }, [commentsStatus, comments]);

    useEffect(() => {
        if (loadComments) {
            socket.emit("joinRoom", {
                roomId: ticketId,
                username: user.username,
            });

            socket.on("roomJoined", (join) => {
                console.log("comment room joined: " + join);
            });
        }

        return () => {
            socket.off("roomJoined");
            socket.emit("leaveRoom", {
                roomId: ticketId,
                username: user.username,
            });
        };
    }, [socket, loadComments]);

    return (
        <>
            {commentsStatus === "success" &&
                (ticketComments.length > 0 ? (
                    !loadComments && (
                        <div className='w-full flex justify-center items-center mt-4'>
                            <button
                                className='btn hover:!outline-none hover:!text-blue-500'
                                onClick={() => setLoadComments(true)}
                            >
                                Load Comments
                            </button>
                        </div>
                    )
                ) : (
                    <div className='w-full text-center text-xl font-semibold mt-4'>
                        No comments. Be the first to comment any concerns.
                    </div>
                ))}
            {loadComments && (
                <>
                    <form className='w-full' onSubmit={handleSubmit}>
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
                                onChange={(e) =>
                                    setCommentInput(e.target.value)
                                }
                                value={commentInput}
                            />
                            <button
                                className='outline outline-[1px] outline-black px-4 py-2 w-24'
                                type='submit'
                            >
                                Post
                            </button>
                        </div>
                    </form>
                    <Comments></Comments>
                </>
            )}
        </>
    );
};

export default CommentSection;
