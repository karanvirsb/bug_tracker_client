import React from "react";
import { IComment } from "../../../Redux/Slices/commentsSlice";
import { IUser } from "../../../Redux/Slices/userSlice";

type props = {
    comment: IComment;
    user: IUser;
};

const Comment = ({ comment, user }: props) => {
    return (
        <div className='flex flex-col items-center w-full'>
            <div
                key={comment.commentId}
                className='flex flex-row gap-4 border-b border-gray-200 py-4 w-[50%] min-w-[250px] max-w-[1000px]'
            >
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
                        <p>{comment.dateCreated.getDate().toLocaleString()}</p>
                    </div>
                    <p>{comment.comment}</p>
                    <div>
                        <button>Reply</button>
                        <button>Delete</button>
                    </div>

                    <button className='text-center mt-2'>Load Replies</button>
                </div>
            </div>
            {/* Comments / replys */}
        </div>
    );
};

export default Comment;
