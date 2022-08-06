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
        setUser: (state: IUser, action: PayloadAction<IUser>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        updateUserRoles: (
            state: IUser,
            action: PayloadAction<{ roles: { [key: string]: string } }>
        ) => {
            const { roles } = action.payload;
            let isAdmin = false;
            let isEditor = false;
            for (const [_, value] of Object.entries(roles)) {
                if (value === "1990") {
                    isAdmin = true;
                } else if (value === "1991") {
                    isEditor = true;
                }
            }
            return {
                ...state,
                isAdmin: isAdmin,
                isEditor: isEditor,
            };
        },
    },
});

export const { setUser, updateUserRoles } = userSlice.actions;

export default userSlice.reducer;
