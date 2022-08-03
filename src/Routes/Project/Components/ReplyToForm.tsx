import React, { useState } from "react";
import { useAppSelector } from "../../../Hooks/hooks";
import { IComment } from "../../../Redux/Slices/commentsSlice";

type props = {
    repliedToUserId: string;
    comment: IComment;
};

const ReplyToForm = ({ repliedToUserId, comment }: props) => {
    const [replyInput, setReplyInput] = useState("");
    const user = useAppSelector((state) => state.persistedReducer.user);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
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
                    onChange={(e) => setReplyInput(e.target.value)}
                    value={replyInput}
                />
                <button
                    className='outline outline-[1px] outline-black px-4 py-2 w-24'
                    type='submit'
                >
                    Post
                </button>
            </div>
        </form>
    );
};

export default ReplyToForm;
