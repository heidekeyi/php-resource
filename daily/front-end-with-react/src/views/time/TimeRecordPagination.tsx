import React from 'react';
import BarPagination from "../components/bar/BarPagination";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeRecordQueryTodo} from "./sliceTimeRecord";

const TimeRecordPagination = () => {
    const {
        pageSize,
        pageIndex,
        prevPageIndex,
        nextPageIndex,
        totalPage
    } = useAppSelect(state => state.timeRecord.query);
    const dispatch = useAppDispatch();
    const update = (query: Partial<IQueryPage>) => dispatch(timeRecordQueryTodo(query));
    return (
        <BarPagination
            pageIndex={pageIndex}
            prevPageIndex={prevPageIndex}
            nextPageIndex={nextPageIndex}
            totalPage={totalPage}
            onPageIndexChange={(pageIndex: string) => update({pageIndex})}
            pageSize={pageSize}
            onPageSizeChange={(pageSize: string) => update({pageSize})}
        />
    );
};

export default TimeRecordPagination;