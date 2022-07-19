import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Project {
    projectId: string;
    groupId: string;
    projectName: string;
    projectDesc: string;
    dateCreated: Date;
    users: string[];
}

const initialState: Project = {
    projectId: "",
    groupId: "",
    projectName: "",
    projectDesc: "",
    dateCreated: new Date(),
    users: [],
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<Project>) => {
            return { ...state, ...action.payload };
        },
        addUsers: (state, action: PayloadAction<Project["users"]>) => {
            return { ...state, users: action.payload };
        },
    },
});

export const { setProject, addUsers } = projectSlice.actions;

export default projectSlice.reducer;
