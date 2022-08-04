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
            state: any,
            action: PayloadAction<ICommentsArr["comments"]>
        ) => {
            return { ...state, comments: action.payload };
        },
    },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
