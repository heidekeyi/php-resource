import {createSlice} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceSearchUpdate, sliceSearchState, searchName} from "../slice/sliceSearch";
import {sliceNameFormShow, sliceNameFormState, sliceFormHide, sliceNameFormUpdate} from "../slice/sliceForm";
import {sliceSelectPathUpdate, sliceSelectItemUpdate, sliceSelectState} from "../slice/sliceSelect";

const path = routeRoutes.unit.path;

export const unitService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path),
    ...sliceSearchState(path, [searchName()]),
    ...sliceSelectState(),
    ...sliceNameFormState(),
};

const sliceUnit = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        unitQueryDone: sliceQueryDone,
        unitQueryTodo: sliceQueryTodo,
        unitDeleteUpdate: sliceDeleteUpdate,
        unitSearchUpdate: sliceSearchUpdate,
        unitFormHide: sliceFormHide,
        unitFormUpdate: sliceNameFormUpdate,
        unitFormShow: sliceNameFormShow,
        unitSelectPathUpdate: sliceSelectPathUpdate,
        unitSelectItemUpdate: sliceSelectItemUpdate,
    },
});

export const {
    unitDeleteUpdate,
    unitQueryDone, unitQueryTodo,
    unitFormHide, unitFormShow,
    unitFormUpdate,
    unitSearchUpdate,
    unitSelectItemUpdate, unitSelectPathUpdate
} = sliceUnit.actions;

export default sliceUnit.reducer;
