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

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject: (state: ProjectState, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
        deleteProject: (state: ProjectState, action: PayloadAction<string>) => {
            const filterProjects = state.projects.filter(
                (project) => project.projectId !== action.payload
            );

            state.projects = filterProjects;
        },
        updateProject: (
            state: ProjectState,
            action: PayloadAction<{ projectId: string; updates: {} }>
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
        updateInitialState: (
            state: ProjectState,
            action: PayloadAction<Project[]>
        ) => {
            return { ...state, projects: action.payload };
        },
    },
});

export const { addProject, updateProject, deleteProject, updateInitialState } =
    projectsSlice.actions;

export default projectsSlice.reducer;
