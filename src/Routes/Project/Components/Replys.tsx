import React, { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import Spinner from "../../../Components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import { setReplys } from "../../../Redux/Slices/replysSlice";
import Comment from "./Comment";

type props = {
    replyIds: string[];
    commentId: string;
};

const TOTAL_REPLYS_VISIBLE = 5;

const Replys = ({ replyIds, commentId }: props) => {
    const totalPages = useMemo(() => {
        if (replyIds) return Math.floor(replyIds.length / TOTAL_REPLYS_VISIBLE);
    }, [replyIds]);

    const commentReplys = useAppSelector((state) => state.replys.replys);
    const users = useAppSelector((state) => state.persistedReducer.group.users);
    const dispatch = useAppDispatch();

    const replyIdsSplice = (currentPage: number) => {
        return [...replyIds].splice(
            currentPage * TOTAL_REPLYS_VISIBLE,
            (currentPage + 1) * TOTAL_REPLYS_VISIBLE
        );
    };

    const fetchReplys = async ({ pageParam = 0 }) => {
        const replyIdsArr = replyIdsSplice(pageParam); // calling method to get the array
        const resp = await axiosPrivate("/comment/reply/comments", {
            method: "post",
            data: { replyIdArr: replyIdsArr },
        });
        if (totalPages !== undefined && totalPages >= 0) {
            console.log(pageParam + 1 < totalPages);
            return {
                response: resp.data,
                hasNextPage: pageParam + 1 < totalPages,
                nextPage: pageParam < totalPages ? pageParam + 1 : null,
            };
        }
    };

    const {
        data: replys,
        isFetchingNextPage,
        hasNextPage,
        status: replyStatus,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery(["replies-" + commentId], fetchReplys, {
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPage ?? undefined;
        },
    });

    useEffect(() => {
        if (replyStatus === "success") {
            const totalReplys: IComment[] = [];
            const replysLength = replys.pages.length;

            for (let i = 0; i < replysLength; i++) {
                totalReplys.push(...replys?.pages[i]?.response);
            }
            dispatch(setReplys({ id: commentId, comments: totalReplys }));
        }
    }, [replys, replyStatus, dispatch, commentId]);

    useEffect(() => {
        refetch();
    }, [refetch, replyIds]);

    return (
        <>
            {replyStatus === "loading" && (
                <div className='w-full flex justify-center items-center'>
                    <Spinner></Spinner>
                </div>
            )}
            {replyStatus === "error" && <div>Error</div>}
            {replyStatus === "success" &&
                // eslint-disable-next-line array-callback-return
                commentReplys[commentId]?.map((comment: IComment) => {
                    const user = users.find(
                        (user) => user.username === comment?.userId
                    );
                    if (user) {
                        return (
                            <Comment
                                key={comment.commentId}
                                user={user}
                                comment={comment}
                                classname='flex flex-row gap-4 py-4 w-[100%] min-w-[250px] max-w-[1000px]'
                                isReply={true}
                            ></Comment>
                        );
                    }
                })}
            {hasNextPage && (
                <button
                    onClick={() => {
                        fetchNextPage();
                    }}
                >
                    {isFetchingNextPage && "Fetching replies"}
                    {hasNextPage && "Load More Replies"}
                </button>
            )}
        </>
    );
};

const MemorizedReplies = ({ replyIds, commentId }: props) =>
    useMemo(() => {
        return <Replys replyIds={replyIds} commentId={commentId}></Replys>;
    }, [commentId, replyIds]);

export default MemorizedReplies;
