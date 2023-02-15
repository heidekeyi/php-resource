import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.timePercent.path;

export const timePercentService = serviceDaily(path);


const sliceTimePercent = createSlice({
    name: 'timePercent',
    initialState: sliceCalibrationState(path),
    reducers: {
        timePercentSearchUpdate: sliceCalibrationSearchUpdate,
        timePercentQueryTodo: sliceCalibrationQueryTodo,
        timePercentQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    timePercentQueryTodo,
    timePercentQueryDone,
    timePercentSearchUpdate
} = sliceTimePercent.actions;

export default sliceTimePercent.reducer;