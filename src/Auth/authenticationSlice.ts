import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    username: string | undefined;
    group_id?: string | undefined;
    roles?: [] | undefined;
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
            state.accessToken = action.payload.accessToken;
            state.group_id = action.payload.group_id;
            state.roles = action.payload.roles;
            state.username = action.payload.username;
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
