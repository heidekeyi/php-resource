import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.sportTrace.path;

export const sportTraceService = serviceDaily(path);


const sliceSportTrace = createSlice({
    name: 'sportTrace',
    initialState: sliceCalibrationState(path),
    reducers: {
        sportTraceSearchUpdate: sliceCalibrationSearchUpdate,
        sportTraceQueryTodo: sliceCalibrationQueryTodo,
        sportTraceQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    sportTraceQueryTodo,
    sportTraceQueryDone,
    sportTraceSearchUpdate
} = sliceSportTrace.actions;

export default sliceSportTrace.reducer;