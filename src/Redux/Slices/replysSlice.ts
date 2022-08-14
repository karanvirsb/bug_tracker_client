import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "./commentsSlice";

export interface IReplys {
    replys: { [key: string]: IComment[] };
}

const initialState: IReplys = {
    replys: {},
};

export const replysSlice = createSlice({
    name: "replys",
    initialState: initialState,
    reducers: {
        setReplys: (
            state: IReplys,
            action: PayloadAction<{ id: string; comments: IComment[] }>
        ) => {
            const { id, comments } = action.payload;

            state.replys[id] = comments;
        },
    },
});

export const { setReplys } = replysSlice.actions;

export default replysSlice.reducer;
