import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface users {
    avatar: { data: any; contentType: string };
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isEditor: boolean;
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
            return { ...state, users: action.payload };
        },
        updateUser: (
            state,
            action: PayloadAction<{
                username: string;
                roles: { [key: string]: string };
            }>
        ) => {
            const { username, roles } = action.payload;
            const user = state.users.find((user) => user.username === username);

            if (!user) {
                return state;
            }

            let isAdmin = false;
            let isEditor = false;

            for (const [_, value] of Object.entries(roles)) {
                if (value === "1990") {
                    isAdmin = true;
                } else if (value === "1991") {
                    isEditor = true;
                }
            }
            const updatedUser = user;
            updatedUser["isAdmin"] = isAdmin;
            updatedUser["isEditor"] = isEditor;

            const oldUsers = [];

            for (const user of state.users) {
                if (user.username !== username) {
                    oldUsers.push(user);
                }
            }

            const newUsers: users[] = [...oldUsers, updatedUser];
            console.log(newUsers);

            state.users = newUsers;
        },
    },
});

export const { setGroup, setUsers, updateUser } = groupSlice.actions;

export default groupSlice.reducer;
