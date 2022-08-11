import React, { useRef } from "react";
import { useAppSelector } from "../../../Hooks/hooks";
import Comment from "./Comment";

const Comments = () => {
    const comments = useAppSelector((state) => state.comments.comments);
    const users = useAppSelector((state) => state.persistedReducer.group.users);
    let count: number = 0;
    let page: number = 0;
    return (
        <div className='flex flex-col items-center gap-4 mt-4 w-full'>
            {comments.map((comment) => {
                if (count === 5) {
                    page += 1;
                    count = 0;
                }
                const user = users.find(
                    (user) => user.username === comment.userId
                );
                count += 1;
                if (comment?.ticketId && user) {
                    return (
                        <Comment
                            key={comment.commentId}
                            comment={comment}
                            user={user}
                            classname='flex flex-row gap-4 py-4 w-[100%]'
                            page={page}
                        ></Comment>
                    );
                }
            })}
        </div>
    );
};

export default Comments;
