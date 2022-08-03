import React, { useState } from "react";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import { IUser } from "../../../Redux/Slices/userSlice";
import ReplyToForm from "./ReplyToForm";

type props = {
    comment: IComment;
    user: IUser;
    classname?: string;
};

const Comment = ({ comment, user, classname }: props) => {
    const [replying, setReplying] = useState(false);
    const dateCreated = new Date(comment?.dateCreated || "");
    const dateString = `${dateCreated.toLocaleDateString()} | ${dateCreated.toLocaleTimeString()}`;
    const replyIds = comment?.reply || [];
    return (
        <div className='flex flex-col items-center w-full'>
            <div key={comment.commentId} className={classname}>
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
                        <button>Delete</button>
                    </div>
                    {replyIds.length > 0 && comment?.ticketId && (
                        <button className='text-center mt-2'>
                            Load Replies
                        </button>
                    )}
                </div>
            </div>
            {replying && (
                <ReplyToForm
                    repliedToUserId={comment.userId}
                    comment={comment}
                    setReplying={setReplying}
                ></ReplyToForm>
            )}
            {/* Comments / replys */}
        </div>
    );
};

export default Comment;
