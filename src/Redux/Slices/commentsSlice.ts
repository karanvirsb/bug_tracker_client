import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
    commentId?: string;
    dateCreated?: Date;
    userId: string;
    ticketId?: string;
    comment: string;
    reply?: string[];
    repliedUserId?: string; // here if need to add an @ feature
    repliedTo?: string;
}

export interface ICommentsArr {
    comments: IComment[];
}

const initialState: ICommentsArr = {
    comments: [],
};

const commentsSlice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {
        setComments: (
            state: ICommentsArr,
            action: PayloadAction<ICommentsArr["comments"]>
        ) => {
            return {
                ...state,
                comments: action.payload,
            };
        },

        deleteComment: (state: ICommentsArr, action: PayloadAction<string>) => {
            return {
                ...state,
                comments: state.comments.filter(
                    (comment) => comment.commentId !== action.payload
                ),
            };
        },
    },
});

export const { setComments, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
