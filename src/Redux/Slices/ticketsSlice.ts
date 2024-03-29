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
        addTicket: (state: TicketsState, action: PayloadAction<ITicket>) => {
            state.tickets.push(action.payload);
        },
        deleteTicket: (state: TicketsState, action: PayloadAction<string>) => {
            const filterTickets = state.tickets.filter(
                (ticket) => ticket.ticketId !== action.payload
            );

            state.tickets = filterTickets;
        },
        updateTicket: (
            state: TicketsState,
            action: PayloadAction<{ ticketId: string; updates: {} }>
        ) => {
            // find the index of the object
            const index = state.tickets.findIndex(
                (ticket) => ticket.ticketId === action.payload.ticketId
            );
            // assign new array
            const newState = [...state.tickets];
            // created updated ticket
            const updatedTicket = {
                ...state.tickets[index],
                ...action.payload.updates,
            };
            // then assign that ticket to a new reference
            newState[index] = updatedTicket;

            // copy state and reassign tickets
            return { ...state, tickets: newState };
        },
        updateInitialState: (
            state: TicketsState,
            action: PayloadAction<TicketsState["tickets"]>
        ) => {
            return { ...state, tickets: action.payload };
        },
    },
});

export const { addTicket, deleteTicket, updateTicket, updateInitialState } =
    ticketsSlice.actions;

export default ticketsSlice.reducer;
