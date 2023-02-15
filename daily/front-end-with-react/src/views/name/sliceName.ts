import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceSearchUpdate, sliceSearchState, searchName} from "../slice/sliceSearch";
import {sliceFormHide} from "../slice/sliceForm";
import {sliceSelectPathUpdate, sliceSelectItemUpdate, sliceSelectState} from "../slice/sliceSelect";


const path = routeRoutes.name.path;

export const nameService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path),
    ...sliceSearchState(path, [searchName()]),
    ...sliceSelectState(),
    form: {
        id: '' as string,
        show: false as boolean,
        name: '' as string
    }
};

const sliceName = createSlice({
    name: 'name',
    initialState,
    reducers: {
        nameQueryDone: sliceQueryDone,
        nameQueryTodo: sliceQueryTodo,
        nameDeleteUpdate: sliceDeleteUpdate,
        nameSearchUpdate: sliceSearchUpdate,
        nameFormHide: sliceFormHide,
        nameSelectPathUpdate: sliceSelectPathUpdate,
        nameSelectItemUpdate: sliceSelectItemUpdate,
        nameFormShow: (state, action: PayloadAction<IObject | undefined>) => {
            const item = action.payload;
            const {id, name} = item ? item : {id: '', name: ''};
            state.form.id = id;
            state.form.name = name;
            state.form.show = true;
        },
        nameFormNameChange: (state, action: PayloadAction<string>) => {
            state.form.name = action.payload;
        },
        nameFormNameTrim: state => {
            state.form.name = state.form.name.trim();
        },
    },
});

export const {
    nameDeleteUpdate,
    nameQueryDone, nameQueryTodo,
    nameFormHide, nameFormShow,
    nameSearchUpdate,
    nameSelectItemUpdate, nameSelectPathUpdate,
    nameFormNameChange, nameFormNameTrim
} = sliceName.actions;
export default sliceName.reducer;
