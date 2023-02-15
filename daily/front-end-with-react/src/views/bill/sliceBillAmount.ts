import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.billAmount.path;

export const billAmountService = serviceDaily(path);


const sliceBillAmount = createSlice({
    name: 'billAmount',
    initialState: sliceCalibrationState(path),
    reducers: {
        billAmountSearchUpdate: sliceCalibrationSearchUpdate,
        billAmountQueryTodo: sliceCalibrationQueryTodo,
        billAmountQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    billAmountQueryTodo,
    billAmountQueryDone,
    billAmountSearchUpdate
} = sliceBillAmount.actions;

export default sliceBillAmount.reducer;