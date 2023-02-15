import {createSlice} from "@reduxjs/toolkit";

const sliceSidebarMode = createSlice({
    name: 'sidebarMode',
    initialState: false,
    reducers: {
        modeSidebarToggle: state => !state
    }
});

export const {modeSidebarToggle} = sliceSidebarMode.actions;

export default sliceSidebarMode.reducer;