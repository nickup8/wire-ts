import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface DrawerState {
    open: boolean;
}

const initialState: DrawerState = {
    open: true,
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.open = !state.open;
        },
    },
});

export const { openDrawer } = drawerSlice.actions;
export const isOpenDrawer = (state: RootState) => state.drawer.open;

export default drawerSlice.reducer;
