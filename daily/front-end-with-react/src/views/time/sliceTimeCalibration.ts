import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationState,
    sliceCalibrationQueryTodo,
    sliceCalibrationSearchUpdate
} from "../slice/sliceCalibration";

const path = routeRoutes.timeCalibration.path;

export const timeCalibrationService = serviceDaily(path);

const sliceTimeCalibration = createSlice({
    name: 'timeCalibration',
    initialState: sliceCalibrationState(path),
    reducers: {
        timeCalibrationSearchUpdate: sliceCalibrationSearchUpdate,
        timeCalibrationQueryTodo: sliceCalibrationQueryTodo,
        timeCalibrationQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    timeCalibrationQueryTodo,
    timeCalibrationQueryDone,
    timeCalibrationSearchUpdate
} = sliceTimeCalibration.actions;

export default sliceTimeCalibration.reducer;