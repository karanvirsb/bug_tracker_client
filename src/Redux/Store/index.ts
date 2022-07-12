import { combineReducers, configureStore } from "@reduxjs/toolkit";
import localForage from "localforage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
// import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import authenticationReducer from "../../Auth/authenticationSlice";
import persistLoginReducer from "../../Auth/persistSlice";
import projectReducer from "../Slices/projectSlice";
import modalReducer from "../Slices/modalSlice";
import groupReducer from "../Slices/groupSlice";

const rootReducer = combineReducers({
    auth: authenticationReducer,
    persist: persistLoginReducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        projects: projectReducer,
        modal: modalReducer,
        group: groupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// export const store = configureStore({
//     reducer: {
//         auth: authenticationReducer,
//         persist: persistLoginReducer,
//         projects: projectReducer,
//         modal: modalReducer,
//         group: groupReducer,
//     },
// });

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
