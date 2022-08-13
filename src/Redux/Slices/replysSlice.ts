import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "./commentsSlice";

export interface IReplys {
    replys: Map<string, IComment[]>;
}

const initialState: IReplys = {
    replys: new Map<string, IComment[]>(),
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
            const replys = state.replys;
            if (replys.has(id)) {
                const prevComments = replys.get(id);
                if (prevComments) {
                    replys.set(id, [...prevComments, ...comments]);
                }
            } else {
                replys.set(id, comments);
            }
        },
    },
});

export const { setReplys } = replysSlice.actions;

export default replysSlice.reducer;
