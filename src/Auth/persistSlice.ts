import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface persistState {
    persist: boolean;
}

export const initialState: persistState = {
    persist:
        JSON.parse(localStorage.getItem("bugTrackerPersist") || "{}") || false,
};

export const persistSlice = createSlice({
    name: "persist",
    initialState: initialState,
    reducers: {
        changePersist: (state, action: PayloadAction<boolean>) => {
            state.persist = action.payload;
        },
    },
});

export const { changePersist } = persistSlice.actions;

export default persistSlice.reducer;
