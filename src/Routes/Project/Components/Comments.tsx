import React from "react";
import { useAppSelector } from "../../../Hooks/hooks";
import Comment from "./Comment";

const Comments = () => {
    const comments = useAppSelector((state) => state.comments.comments);
    const users = useAppSelector((state) => state.persistedReducer.group.users);
    return (
        <div className='flex flex-col items-center gap-4 mt-4 w-full'>
            {comments.map((comment) => {
                const user = users.find(
                    (user) => user.username === comment.userId
                );
                if (comment?.ticketId && user) {
                    return (
                        <Comment
                            comment={comment}
                            user={user}
                            classname='flex flex-row gap-4 py-4 w-[75%] min-w-[250px] max-w-[1000px]'
                        ></Comment>
                    );
                }
            })}
        </div>
    );
};

export default Comments;
