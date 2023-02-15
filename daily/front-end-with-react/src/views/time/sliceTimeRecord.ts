import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import serviceDaily from "../../services/serviceDaily";
import routeRoutes from "../../route/routeRoutes";
import UtilTimeFormat from "../../utils/UtilTimeFormat";
import {sliceDeleteState, sliceDeleteUpdate} from "../slice/sliceDelete";
import {sliceQueryTodo, sliceQueryState, sliceQueryDone} from "../slice/sliceQuery";
import {sliceSearchUpdate, searchDate, searchCategory, sliceSearchState} from "../slice/sliceSearch";
import {sliceFormHide, sliceCategoryFormUpdate} from "../slice/sliceForm";

const path = routeRoutes.timeRecord.path;

export const timeRecordService = serviceDaily(path);

const initialState = {
    ...sliceDeleteState(),
    ...sliceQueryState(path),
    ...sliceSearchState(path, [searchCategory(), searchDate()]),
    form: {
        id: '' as string,
        show: false as boolean,
        categoryId: '' as string,
        categoryName: '' as string,
        beginTime: '' as string,
        endTime: '' as string,
    }
};

const sliceTimeRecord = createSlice({
    name: 'timeRecord',
    initialState,
    reducers: {
        timeRecordQueryDone: sliceQueryDone,
        timeRecordQueryTodo: sliceQueryTodo,
        timeRecordDeleteUpdate: sliceDeleteUpdate,
        timeRecordSearchUpdate: sliceSearchUpdate,
        timeRecordFormHide: sliceFormHide,
        timeRecordCategoryFormUpdate: sliceCategoryFormUpdate,
        timeRecordFormShow: (state, action: PayloadAction<IObject | undefined>) => {
            const item = action.payload;
            state.form.show = true;
            if (item) {
                const {id, beginTime, endTime, categoryId, categoryName} = item;
                state.form.beginTime = new UtilTimeFormat(+beginTime).timestamp();
                state.form.endTime = new UtilTimeFormat(+endTime).timestamp();
                state.form.categoryId = categoryId;
                state.form.categoryName = categoryName;
                state.form.id = id;
            } else {
                state.form.id = '';
                state.form.categoryId = '';
                state.form.categoryName = 'please select category';
                let time = state.form.endTime;
                if (!(time === '' || time.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/))) {
                    let suffix = '';
                    if (time.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
                        suffix = ' 0:0:0';
                    } else if (time.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}$/)) {
                        suffix = ':0:0';
                    } else if (time.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}$/)) {
                        suffix = ':0';
                    }
                    time = `${time}${suffix}`;
                }
                state.form.beginTime = time;
                state.form.endTime = time.split(':')[0];
            }
        },
        timeRecordFormBeginTimeUpdate: (state, action: PayloadAction<string>) => {
            state.form.beginTime = action.payload;
        },
        timeRecordFormEndTimeUpdate: (state, action: PayloadAction<string>) => {
            state.form.endTime = action.payload;
        },
        timeRecordFormTrim: state => {
            state.form.endTime = state.form.endTime.trim();
            state.form.beginTime = state.form.beginTime.trim();
        }
    },
});

export const {
    timeRecordDeleteUpdate,
    timeRecordFormBeginTimeUpdate,
    timeRecordCategoryFormUpdate,
    timeRecordFormEndTimeUpdate,
    timeRecordFormHide,
    timeRecordFormShow,
    timeRecordQueryDone,
    timeRecordQueryTodo,
    timeRecordSearchUpdate,
    timeRecordFormTrim
} = sliceTimeRecord.actions;

export default sliceTimeRecord.reducer;
