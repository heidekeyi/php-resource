import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.sportAmount.path;

export const sportAmountService = serviceDaily(path);


const sliceSportAmount = createSlice({
    name: 'sportAmount',
    initialState: sliceCalibrationState(path),
    reducers: {
        sportAmountSearchUpdate: sliceCalibrationSearchUpdate,
        sportAmountQueryTodo: sliceCalibrationQueryTodo,
        sportAmountQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    sportAmountQueryTodo,
    sportAmountQueryDone,
    sportAmountSearchUpdate
} = sliceSportAmount.actions;

export default sliceSportAmount.reducer;