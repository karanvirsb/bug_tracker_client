import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    avatar: { data: any; contentType: string };
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isEditor: boolean;
}

const initialState: IUser = {
    avatar: { data: "", contentType: "" },
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    isEditor: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
