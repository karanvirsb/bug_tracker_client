import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface users {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: { [key: string | number]: string };
}
export interface GroupState {
    groupId: string;
    groupName: string;
    groupInviteCode: string;
    users: users[];
}

const initialState: GroupState = {
    groupId: "",
    groupName: "",
    groupInviteCode: "",
    users: [],
};

export const groupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<GroupState>) => {
            return { ...state, ...action.payload };
        },
        setUsers: (state, action: PayloadAction<GroupState["users"]>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setGroup, setUsers } = groupSlice.actions;

export default groupSlice.reducer;
