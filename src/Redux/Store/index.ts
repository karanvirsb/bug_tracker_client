import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../../Auth/authenticationSlice";
import persistReducer from "../../Auth/persistSlice";

export const store = configureStore({
    reducer: {
        auth: authenticationReducer,
        persist: persistReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
