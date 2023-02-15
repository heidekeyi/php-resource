import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const sliceLoading = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        loadingUpdate: (state, action: PayloadAction<boolean>) => action.payload,
    }
});

export const {loadingUpdate} = sliceLoading.actions;

export default sliceLoading.reducer;