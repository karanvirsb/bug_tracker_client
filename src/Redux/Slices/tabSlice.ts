import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type tabs = {
    value: string;
    label: string;
};

export interface ITab {
    tabs: tabs[];
    components: {
        [key: string]: JSX.Element;
    };
}

const initialState: ITab = {
    tabs: [],
    components: {},
};

export const tabSlice = createSlice({
    name: "tabs",
    initialState: initialState,
    reducers: {
        setTabs: (state: ITab, action: PayloadAction<ITab>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setTabs } = tabSlice.actions;

export default tabSlice.reducer;
