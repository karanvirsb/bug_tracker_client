import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
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
// TODO paginate infintie
const Replys = ({ replyIds, commentId }: props) => {
    const commentReplys = useAppSelector((state) => state.replys.replys);
    const users = useAppSelector((state) => state.persistedReducer.group.users);
    const dispatch = useAppDispatch();

    const fetchReplys = async (replyIds: string[]) => {
        const resp = await axiosPrivate("/comment/reply/comments", {
            method: "post",
            data: { replyIdArr: replyIds },
        });
        return resp.data;
    };

    const {
        data: replys,
        status: replyStatus,
        refetch: refetchReplys,
    } = useQuery("replies-" + commentId, () => fetchReplys(replyIds));

    useEffect(() => {
        if (replyStatus === "success") {
            dispatch(setReplys({ id: commentId, comments: replys }));
        }
    }, [replys, replyStatus]);

    useEffect(() => {
        refetchReplys();
        console.log(replyIds);
    }, [replyIds]);

    return (
        <>
            {replyStatus === "loading" && (
                <div className='w-full flex justify-center items-center'>
                    <Spinner></Spinner>
                </div>
            )}
            {replyStatus === "error" && <div>Error</div>}
            {replyStatus === "success" &&
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
        </>
    );
};

const memorizedReplies = ({ replyIds, commentId }: props) =>
    useMemo(() => {
        return <Replys replyIds={replyIds} commentId={commentId}></Replys>;
    }, [replyIds]);

export default memorizedReplies;
