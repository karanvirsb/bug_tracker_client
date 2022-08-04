import React from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../../../Components/AxiosInterceptors";
import { useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import Comment from "./Comment";

type props = {
    replyIds: string[];
    ticketId: string;
};

const Replys = ({ replyIds, ticketId }: props) => {
    const users = useAppSelector((state) => state.persistedReducer.group.users);
    const fetchReplys = async () => {
        const resp = await axiosPrivate("/comment/reply/comments", {
            method: "post",
            data: { replyIdArr: replyIds },
        });
        return resp.data;
    };

    const { data: replys, status: replyStatus } = useQuery(
        "replies-" + ticketId,
        fetchReplys
    );

    return (
        <>
            {replys?.map((comment: IComment) => {
                const user = users.find(
                    (user) => user.username === comment?.userId
                );
                if (user) {
                    return (
                        <Comment
                            user={user}
                            comment={comment}
                            classname='flex flex-row gap-4 border-l border-gray-200 py-4 w-[50%] min-w-[250px] max-w-[1000px] pl-5'
                        ></Comment>
                    );
                }
            })}
        </>
    );
};

export default Replys;
