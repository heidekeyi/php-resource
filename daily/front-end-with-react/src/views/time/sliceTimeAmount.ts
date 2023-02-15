import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.timeAmount.path;

export const timeAmountService = serviceDaily(path);


const sliceTimeAmount = createSlice({
    name: 'timeAmount',
    initialState: sliceCalibrationState(path),
    reducers: {
        timeAmountSearchUpdate: sliceCalibrationSearchUpdate,
        timeAmountQueryTodo: sliceCalibrationQueryTodo,
        timeAmountQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    timeAmountQueryTodo,
    timeAmountQueryDone,
    timeAmountSearchUpdate
} = sliceTimeAmount.actions;

export default sliceTimeAmount.reducer;