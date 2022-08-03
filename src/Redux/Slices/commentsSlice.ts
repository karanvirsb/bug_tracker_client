import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
    commentId: string;
    dateCreated: Date;
    userId: string;
    ticketId?: string;
    comment: string;
    reply: string[];
    repliedUserId?: string; // here if need to add an @ feature
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
        setComments: (state, action: PayloadAction<ICommentsArr>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
