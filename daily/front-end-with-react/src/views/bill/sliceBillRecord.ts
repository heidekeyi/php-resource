import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import {sliceCategoryFormUpdate, sliceFormHide, sliceAmountFormUpdate, sliceDateFormUpdate} from "../slice/sliceForm";
import {sliceSearchUpdate, sliceSearchState, searchDate, searchCategory} from "../slice/sliceSearch";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import UtilTimeFormat from "../../utils/UtilTimeFormat";

const path = routeRoutes.billRecord.path;

export const billRecordService = serviceDaily(path);


const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path, 20),
    ...sliceSearchState(path, [searchCategory(), searchDate()]),
    form: {
        id: '' as string,
        show: false as boolean,
        categoryId: '' as string,
        categoryName: '' as string,
        amount: '' as string,
        date: '' as string,
    }
};

const sliceBillRecord = createSlice({
    name: 'billRecord',
    initialState,
    reducers: {
        billRecordQueryDone: sliceQueryDone,
        billRecordQueryTodo: sliceQueryTodo,
        billRecordDeleteUpdate: sliceDeleteUpdate,
        billRecordSearchUpdate: sliceSearchUpdate,
        billRecordFormHide: sliceFormHide,
        billRecordCategoryFormUpdate: sliceCategoryFormUpdate,
        billRecordAmountFormUpdate: sliceAmountFormUpdate,
        billRecordDateFormUpdate: sliceDateFormUpdate,
        billRecordFormShow: (state, action: PayloadAction<IObject | undefined>) => {
            const item = action.payload;
            state.form.show = true;
            if (item) {
                const {id, amount, categoryId, categoryName, date} = item;
                state.form.categoryId = categoryId;
                state.form.categoryName = categoryName;
                state.form.amount = (+amount / 100).toFixed(2);
                state.form.date = new UtilTimeFormat(+date).dateTime();
                state.form.id = id;
            } else {
                state.form.id = '';
                state.form.categoryId = '';
                state.form.amount = '';
                state.form.categoryName = 'please select category';
            }
        },
        billRecordFormTrim: state => {
            state.form.amount = state.form.amount.trim();
            state.form.date = state.form.date.trim();
        }
    },
});

export const {
    billRecordDeleteUpdate,
    billRecordQueryDone, billRecordQueryTodo,
    billRecordSearchUpdate,
    billRecordFormShow, billRecordFormHide,
    billRecordAmountFormUpdate,
    billRecordCategoryFormUpdate, billRecordDateFormUpdate,
    billRecordFormTrim,
} = sliceBillRecord.actions;

export default sliceBillRecord.reducer;
