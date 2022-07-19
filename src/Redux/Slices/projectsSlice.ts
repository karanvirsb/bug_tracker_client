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

export interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: [],
};

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        deleteProject: (state, action: PayloadAction<String>) => {
            const filterProjects = state.projects.filter(
                (project) => project.projectId !== action.payload
            );

            state.projects = filterProjects;
        },
        updateProject: (
            state,
            action: PayloadAction<{ projectId: String; updates: {} }>
        ) => {
            // find the index of the object
            const index = state.projects.findIndex(
                (project) => project.projectId === action.payload.projectId
            );
            // assign new array
            const newState = [...state.projects];
            // created updated project
            const updatedProject = {
                ...state.projects[index],
                ...action.payload.updates,
            };
            // then assign that project to a new reference
            newState[index] = updatedProject;

            // copy state and reassign projects
            return { ...state, projects: newState };
        },
        updateInitialState: (state, action: PayloadAction<Project[]>) => {
            return { ...state, projects: action.payload };
        },
    },
});

export const { addProject, updateProject, deleteProject, updateInitialState } =
    projectSlice.actions;

export default projectSlice.reducer;
