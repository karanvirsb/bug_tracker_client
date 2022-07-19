import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITicket {
    ticketId?: string;
    title: string;
    description: string;
    assignedDev: string[];
    dateCreated?: Date;
    time: number;
    ticketStatus: string;
    ticketSeverity: string;
    ticketType: string;
    reporterId: string;
    projectId: string;
}

type TicketsState = {
    tickets: ITicket[];
};

const initialState: TicketsState = {
    tickets: [],
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: initialState,
    reducers: {
        addTicket: (state, action: PayloadAction<ITicket>) => {
            state.tickets.push(action.payload);
        },
        deleteTicket: (state, action: PayloadAction<String>) => {
            const filterTickets = state.tickets.filter(
                (project) => project.ticketId !== action.payload
            );

            state.tickets = filterTickets;
        },
        updateTicket: (
            state,
            action: PayloadAction<{ ticketId: String; updates: {} }>
        ) => {
            // find the index of the object
            const index = state.tickets.findIndex(
                (project) => project.ticketId === action.payload.ticketId
            );
            // assign new array
            const newState = [...state.tickets];
            // created updated project
            const updatedTicket = {
                ...state.tickets[index],
                ...action.payload.updates,
            };
            // then assign that project to a new reference
            newState[index] = updatedTicket;

            // copy state and reassign tickets
            return { ...state, tickets: newState };
        },
        updateInitialState: (
            state,
            action: PayloadAction<TicketsState["tickets"]>
        ) => {
            return { ...state, tickets: action.payload };
        },
    },
});

const { addTicket, deleteTicket, updateTicket, updateInitialState } =
    ticketsSlice.actions;

export default ticketsSlice.reducer;
