import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../Hooks/hooks";

const CommentSection = () => {
    const [loadComments, setLoadComments] = useState(false);
    const user = useAppSelector((state) => state.persistedReducer.user);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
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
                    />
                    <button
                        className='outline outline-[1px] outline-black px-4 py-2 w-24'
                        type='submit'
                    >
                        Post
                    </button>
                </div>
            </form>
            {!loadComments && (
                <div className='w-full flex justify-center items-center mt-4'>
                    <button
                        className='btn hover:!outline-none hover:!text-blue-500'
                        onClick={() => setLoadComments(true)}
                    >
                        Load Comments
                    </button>
                </div>
            )}
            {loadComments && <div>Comments</div>}
        </>
    );
};

export default CommentSection;
