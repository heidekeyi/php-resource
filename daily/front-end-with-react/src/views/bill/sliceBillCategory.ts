import {createSlice} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceSearchUpdate, sliceSearchState, searchName, searchParent} from "../slice/sliceSearch";
import {
    sliceParentFormShow,
    sliceParentFormUpdate,
    sliceParentFormState,
    sliceNameFormUpdate,
    sliceFormHide,
    sliceParentFormToggle,
} from "../slice/sliceForm";
import {sliceSelectPathUpdate, sliceSelectItemUpdate, sliceSelectState} from "../slice/sliceSelect";

const path = routeRoutes.billCategory.path;

export const billCategoryService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path, 999),
    ...sliceSearchState(path, [searchParent(), searchName()]),
    ...sliceParentFormState(),
    ...sliceSelectState(),
};

const sliceBillCategory = createSlice({
    name: 'billCategory',
    initialState,
    reducers: {
        billCategorySelectPathUpdate: sliceSelectPathUpdate,
        billCategorySelectItemUpdate: sliceSelectItemUpdate,
        billCategoryQueryDone: sliceQueryDone,
        billCategoryQueryTodo: sliceQueryTodo,
        billCategoryDeleteUpdate: sliceDeleteUpdate,
        billCategorySearchUpdate: sliceSearchUpdate,
        billCategoryFormHide: sliceFormHide,
        billCategoryNameFormUpdate: sliceNameFormUpdate,
        billCategoryParentFormUpdate: sliceParentFormUpdate,
        billCategoryFormShow: sliceParentFormShow,
        billCategoryFormToggle: sliceParentFormToggle,
    },
});

export const {
    billCategoryQueryDone, billCategoryQueryTodo,
    billCategoryFormShow, billCategoryFormHide,
    billCategoryFormToggle, billCategoryNameFormUpdate, billCategoryParentFormUpdate,
    billCategoryDeleteUpdate,
    billCategorySearchUpdate,
    billCategorySelectItemUpdate, billCategorySelectPathUpdate
} = sliceBillCategory.actions;

export default sliceBillCategory.reducer;
