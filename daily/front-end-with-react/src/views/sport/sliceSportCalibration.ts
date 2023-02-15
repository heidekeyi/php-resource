import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.sportCalibration.path;

export const sportCalibrationService = serviceDaily(path);


const sliceTimeCalibration = createSlice({
    name: 'sportCalibration',
    initialState: sliceCalibrationState(path),
    reducers: {
        sportCalibrationSearchUpdate: sliceCalibrationSearchUpdate,
        sportCalibrationQueryTodo: sliceCalibrationQueryTodo,
        sportCalibrationQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    sportCalibrationQueryTodo,
    sportCalibrationQueryDone,
    sportCalibrationSearchUpdate
} = sliceTimeCalibration.actions;

export default sliceTimeCalibration.reducer;