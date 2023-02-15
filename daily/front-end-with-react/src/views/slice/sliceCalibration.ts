import {PayloadAction} from "@reduxjs/toolkit";
import {sliceSearchState, sliceSearchUpdate, searchBeginTime, searchEndTime} from "./sliceSearch";

interface ICalibrationState {
    list: IObject[];
    todo: boolean;
    searchList: ISearch[];
}

const sliceCalibrationState = (path: string): ICalibrationState => {
    return {
        ...sliceSearchState(path, [searchBeginTime(), searchEndTime()]),
        list: [],
        todo: false,
    };
};

const sliceCalibrationSearchUpdate = sliceSearchUpdate;

const sliceCalibrationQueryTodo = (state: ICalibrationState) => {
    state.todo = true;
};

const sliceCalibrationQueryDone = (state: ICalibrationState, action: PayloadAction<IObject[] | undefined>) => {
    const list = action.payload;
    state.todo = false;
    if (list) {
        state.list = list;
    }
    state.searchList.forEach(it => it.value = it.value.trim());
}

export {
    sliceCalibrationState,
    sliceCalibrationSearchUpdate,
    sliceCalibrationQueryTodo,
    sliceCalibrationQueryDone
};