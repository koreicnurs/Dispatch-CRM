import {createSlice} from "@reduxjs/toolkit";

const name = 'drawer';

export const initialState = {
    drawerOpen: true
};

const photosSlice = createSlice({
    name,
    initialState,
    reducers: {
        handleDrawer(state, action) {
            state.drawerOpen = action.payload;
        },
    }
});

export default photosSlice;