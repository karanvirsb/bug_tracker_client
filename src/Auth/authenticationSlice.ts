import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    username: string | undefined;
    group_id?: string;
    roles?: string[];
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
        setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
            return { ...state, ...action.payload };
        },

        updateAccessToken: (
            state: AuthState,
            action: PayloadAction<string>
        ) => {
            return {
                ...state,
                accessToken: action.payload,
            };
        },
    },
});

export const { setAuth, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
