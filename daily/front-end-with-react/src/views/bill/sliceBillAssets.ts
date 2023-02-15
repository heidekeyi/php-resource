import {createSlice} from "@reduxjs/toolkit";
import routeRoutes from "../../route/routeRoutes";
import serviceDaily from "../../services/serviceDaily";
import {
    sliceCalibrationQueryDone,
    sliceCalibrationSearchUpdate,
    sliceCalibrationState,
    sliceCalibrationQueryTodo
} from "../slice/sliceCalibration";

const path = routeRoutes.billAssets.path;

export const billAssetsService = serviceDaily(path);


const sliceBillAssets = createSlice({
    name: 'billAssets',
    initialState: sliceCalibrationState(path),
    reducers: {
        billAssetsSearchUpdate: sliceCalibrationSearchUpdate,
        billAssetsQueryTodo: sliceCalibrationQueryTodo,
        billAssetsQueryDone: sliceCalibrationQueryDone,
    }
});

export const {
    billAssetsQueryTodo,
    billAssetsQueryDone,
    billAssetsSearchUpdate
} = sliceBillAssets.actions;

export default sliceBillAssets.reducer;