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


const path = routeRoutes.timeCategory.path;

export const timeCategoryService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path, 999),
    ...sliceSearchState(path, [searchParent(), searchName()]),
    ...sliceParentFormState(),
    ...sliceSelectState(),
};

const sliceTimeCategory = createSlice({
    name: 'timeCategory',
    initialState,
    reducers: {
        timeCategorySelectPathUpdate: sliceSelectPathUpdate,
        timeCategorySelectItemUpdate: sliceSelectItemUpdate,
        timeCategoryQueryDone: sliceQueryDone,
        timeCategoryQueryTodo: sliceQueryTodo,
        timeCategoryDeleteUpdate: sliceDeleteUpdate,
        timeCategorySearchUpdate: sliceSearchUpdate,
        timeCategoryFormHide: sliceFormHide,
        timeCategoryNameFormUpdate: sliceNameFormUpdate,
        timeCategoryParentFormUpdate: sliceParentFormUpdate,
        timeCategoryFormShow: sliceParentFormShow,
        timeCategoryFormToggle: sliceParentFormToggle,
    },
});

export const {
    timeCategoryQueryDone, timeCategoryQueryTodo,
    timeCategoryFormShow, timeCategoryFormHide,
    timeCategoryNameFormUpdate, timeCategoryParentFormUpdate, timeCategoryFormToggle,
    timeCategoryDeleteUpdate,
    timeCategorySearchUpdate,
    timeCategorySelectItemUpdate, timeCategorySelectPathUpdate
} = sliceTimeCategory.actions;

export default sliceTimeCategory.reducer;
