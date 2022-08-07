import React, { lazy, Suspense } from "react";
import Spinner from "../../../Components/Spinner";
import { useAppSelector } from "../../../Hooks/hooks";
const Comment = lazy(() => import("./Comment"));

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
                        <Suspense
                            fallback={
                                <div className='bg-white w-20 h-20 rounded-lg flex justify-center items-center'>
                                    <Spinner></Spinner>
                                </div>
                            }
                        >
                            <Comment
                                key={comment.commentId}
                                comment={comment}
                                user={user}
                                classname='flex flex-row gap-4 py-4 w-[75%] min-w-[250px] max-w-[1000px]'
                            ></Comment>
                        </Suspense>
                    );
                }
            })}
        </div>
    );
};

export default Comments;
