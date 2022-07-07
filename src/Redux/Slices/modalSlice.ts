import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    type: "createProject" | "";
    open: boolean;
}

const initialState: ModalState = {
    type: "",
    open: false,
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
    },
});

export const { setType, setOpen, resetModal } = modalSlice.actions;

export default modalSlice.reducer;
