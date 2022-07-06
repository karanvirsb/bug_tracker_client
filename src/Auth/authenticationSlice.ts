import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    username: string | undefined;
    group_id?: string | undefined;
    roles?: string[] | undefined;
    accessToken: string | undefined;
}

const initialState: AuthState = {
    username: "",
    group_id: "",
    roles: [],
    accessToken: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            const newState = { ...state, ...action.payload };
            return newState;
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
