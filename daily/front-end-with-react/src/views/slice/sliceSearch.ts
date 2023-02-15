import {PayloadAction} from "@reduxjs/toolkit";
import UtilQuery from "../../utils/UtilQuery";

interface ISliceSearchState {
    searchList: ISearch[];
}

const searchName = (): ISearch => {
    return {
        field: 'name',
        placeholder: 'name',
        value: '',
        maxLength: 32
    };
};

const searchParent = (): ISearch => {
    return {
        field: 'parentName',
        placeholder: 'parent',
        value: '',
        maxLength: 32
    }
};

const searchDate = (): ISearch => {
    return {
        field: 'date',
        placeholder: 'date',
        value: '',
        maxLength: 24,
        date: true
    };
}

const searchCategory = (): ISearch => {
    return {
        field: 'categoryName',
        placeholder: 'category',
        value: '',
        maxLength: 32
    };
};

const searchUnit = (): ISearch => {
    return {
        field: 'unitName',
        placeholder: 'unit',
        value: '',
        maxLength: 32
    };
};

const searchBeginTime = (): ISearch => {
    return {
        field: 'beginTime',
        placeholder: 'begin',
        value: '',
        maxLength: 24,
        date: true
    };
};

const searchEndTime = (): ISearch => {
    return {
        field: 'endTime',
        placeholder: 'end',
        value: '',
        maxLength: 24,
        date: true
    };
};

const sliceSearchState = (path: string, list: ISearch[]): ISliceSearchState => {
    const {pathname, search} = window.location;
    if (path === pathname) {
        const query = new UtilQuery().query(search);
        list.forEach(it => {
            let value = query.fetchOne(it.field);
            if (it.date && value && !value.match(/^\s*\d{4}(-\d{1,2}){0,2}\s*$/)) {
                value = '';
            }
            it.value = value;
        });
    }
    return {searchList: list};
};

const sliceSearchUpdate = (state: ISliceSearchState, action: PayloadAction<ISearch>) => {
    const item = action.payload;
    state.searchList.forEach(it => {
        if (it.field === item.field) {
            it.value = item.value;
        }
    });
};

export {
    sliceSearchUpdate, sliceSearchState,
    searchCategory, searchDate, searchName, searchParent, searchUnit,
    searchBeginTime, searchEndTime,
};