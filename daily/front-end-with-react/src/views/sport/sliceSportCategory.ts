import {createSlice} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceSearchUpdate, sliceSearchState, searchName} from "../slice/sliceSearch";
import {sliceNameFormShow, sliceNameFormState, sliceFormHide, sliceNameFormUpdate} from "../slice/sliceForm";
import {sliceSelectPathUpdate, sliceSelectItemUpdate, sliceSelectState} from "../slice/sliceSelect";

const path = routeRoutes.sportCategory.path;

export const sportCategoryService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path),
    ...sliceSearchState(path, [searchName()]),
    ...sliceNameFormState(),
    ...sliceSelectState(),
};

const sliceSportCategory = createSlice({
    name: 'sportCategory',
    initialState,
    reducers: {
        sportCategoryQueryDone: sliceQueryDone,
        sportCategoryQueryTodo: sliceQueryTodo,
        sportCategoryDeleteUpdate: sliceDeleteUpdate,
        sportCategorySearchUpdate: sliceSearchUpdate,
        sportCategoryFormHide: sliceFormHide,
        sportCategoryFormUpdate: sliceNameFormUpdate,
        sportCategoryFormShow: sliceNameFormShow,
        sportCategorySelectPathUpdate: sliceSelectPathUpdate,
        sportCategorySelectItemUpdate: sliceSelectItemUpdate,
    },
});

export const {
    sportCategoryDeleteUpdate,
    sportCategoryQueryDone, sportCategoryQueryTodo,
    sportCategoryFormHide, sportCategoryFormShow, sportCategoryFormUpdate,
    sportCategorySearchUpdate,
    sportCategorySelectItemUpdate, sportCategorySelectPathUpdate
} = sliceSportCategory.actions;

export default sliceSportCategory.reducer;
