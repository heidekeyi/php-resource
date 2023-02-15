import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceFormHide, sliceCategoryFormUpdate, sliceDateFormUpdate, sliceAmountFormUpdate} from "../slice/sliceForm";
import {sliceSearchUpdate, sliceSearchState, searchDate, searchCategory, searchUnit} from "../slice/sliceSearch";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import UtilTimeFormat from "../../utils/UtilTimeFormat";

const path = routeRoutes.sportRecord.path;
export const sportRecordService = serviceDaily(path);
const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path),
    ...sliceSearchState(path, [searchCategory(), searchUnit(), searchDate()]),
    form: {
        id: '' as string,
        show: false as boolean,
        categoryId: '' as string,
        categoryName: '' as string,
        unitId: '' as string,
        unitName: '' as string,
        amount: '' as string,
        date: '' as string,
    }
};

const sliceSportRecord = createSlice({
    name: 'sportRecord',
    initialState,
    reducers: {
        sportRecordQueryDone: sliceQueryDone,
        sportRecordQueryTodo: sliceQueryTodo,
        sportRecordDeleteUpdate: sliceDeleteUpdate,
        sportRecordSearchUpdate: sliceSearchUpdate,
        sportRecordFormHide: sliceFormHide,
        sportRecordCategoryFormUpdate: sliceCategoryFormUpdate,
        sportRecordAmountFormUpdate: sliceAmountFormUpdate,
        sportRecordDateFormUpdate: sliceDateFormUpdate,
        sportRecordUnitFormUpdate: (state, action: PayloadAction<IObject>) => {
            const {id, name} = action.payload;
            state.form.unitId = id;
            state.form.unitName = name;
        },
        sportRecordFormShow: (state, action: PayloadAction<IObject | undefined>) => {
            const item = action.payload;
            state.form.show = true;
            if (item) {
                const {id, amount, categoryId, categoryName, unitId, unitName, date} = item;
                state.form.categoryId = categoryId;
                state.form.categoryName = categoryName;
                state.form.unitId = unitId;
                state.form.unitName = unitName;
                state.form.amount = amount;
                state.form.date = new UtilTimeFormat(+date).dateTime();
                state.form.id = id;
            } else {
                state.form.id = '';
                state.form.categoryId = '';
                state.form.unitId = '';
                state.form.amount = '';
                state.form.categoryName = 'please select category';
                state.form.unitName = 'please select unit';
            }
        },
        sportRecordFormTrim: state => {
            state.form.amount = state.form.amount.trim();
            state.form.date = state.form.date.trim();
        }
    },
});

export const {
    sportRecordDeleteUpdate,
    sportRecordQueryDone, sportRecordQueryTodo,
    sportRecordSearchUpdate,
    sportRecordFormShow, sportRecordFormHide,
    sportRecordAmountFormUpdate,
    sportRecordCategoryFormUpdate,
    sportRecordDateFormUpdate,
    sportRecordUnitFormUpdate,
    sportRecordFormTrim,
} = sliceSportRecord.actions;

export default sliceSportRecord.reducer;
