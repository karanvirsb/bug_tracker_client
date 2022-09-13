import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PersistState {
    persist: boolean;
}

export const initialState: PersistState = {
    persist:
        JSON.parse(localStorage.getItem("bugTrackerPersist") || "{}") || false,
};

export const persistSlice = createSlice({
    name: "persist",
    initialState,
    reducers: {
        changePersist: (
            state: PersistState,
            action: PayloadAction<boolean>
        ) => {
            state.persist = action.payload;
        },
    },
});

export const { changePersist } = persistSlice.actions;

export default persistSlice.reducer;
