import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface ModalState {
    type: "createProject" | "";
    open: boolean;
    component: React.FC | null;
}

const initialState: ModalState = {
    type: "",
    open: false,
    component: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<"createProject" | "">) => {
            return { ...state, type: action.payload };
        },
        setOpen: (state, action: PayloadAction<boolean>) => {
            return { ...state, open: action.payload };
        },
        resetModal: () => {
            return initialState;
        },
        setModal: (state, action: PayloadAction<ModalState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setType, setOpen, resetModal } = modalSlice.actions;

export default modalSlice.reducer;