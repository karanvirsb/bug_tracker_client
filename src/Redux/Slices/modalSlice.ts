import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    type:
        | "createProject"
        | "updateProject"
        | "deleteProject"
        | "createTicket"
        | "updateTicket"
        | "deleteTicket"
        | "";
    open: boolean;
    options: { projectId?: string; ticketId?: string };
}

const initialState: ModalState = {
    type: "",
    open: false,
    options: {},
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<ModalState["type"]>) => {
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

export const { setType, setOpen, resetModal, setModal } = modalSlice.actions;

export default modalSlice.reducer;
