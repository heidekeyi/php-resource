import {PayloadAction} from "@reduxjs/toolkit";
import UtilQuery from "../../utils/UtilQuery";

interface ISliceQueryState {
    query: IResultQuery & {
        todo?: boolean;
    };
    searchList: ISearch[];
    form: {
        show: boolean;
    }
}

const sliceQueryState = (path: string, size: number = 20): ISliceQueryState => {
    const pageIndex = '1';
    const pageSize = size.toString();
    const state: ISliceQueryState = {
        query: {
            pageIndex, pageSize,
            totalPage: '1',
            prevPageIndex: '1',
            nextPageIndex: '1',
            list: [],
            todo: true,
        },
        searchList: [],
        form: {
            show: false
        }
    };
    const {search, pathname} = window.location;
    if (path === pathname) {
        const query = new UtilQuery().query(search);
        state.query.pageSize = query.positive('pageSize', pageSize);
        state.query.pageIndex = query.positive('pageIndex', pageIndex);
    }
    return state;
};

const sliceQueryDone = (state: ISliceQueryState, action: PayloadAction<IResultQuery | undefined>) => {
    const item = action.payload;
    if (item) {
        state.query = item;
    }
    state.searchList.forEach(it => it.value = it.value.trim());
    state.query.todo = false;
};

const sliceQueryTodo = (state: ISliceQueryState, action: PayloadAction<Partial<IQueryPage>>) => {
    state.query = {
        ...state.query,
        ...action.payload,
        todo: true
    };
    state.form.show = false;
};
export {sliceQueryState, sliceQueryDone, sliceQueryTodo};