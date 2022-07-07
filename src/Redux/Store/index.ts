import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../../Auth/authenticationSlice";
import persistReducer from "../../Auth/persistSlice";
import projectSlice from "../Slices/projectSlice";
import modalSlice from "../Slices/modalSlice";

export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        persist: persistReducer,
        projects: projectSlice,
        modal: modalSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
