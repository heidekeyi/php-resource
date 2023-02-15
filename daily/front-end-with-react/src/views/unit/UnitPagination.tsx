import React from 'react';
import BarPagination from "../components/bar/BarPagination";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {unitQueryTodo} from "./sliceUnit";

const UnitPagination = () => {
    const {pageSize, pageIndex, prevPageIndex, nextPageIndex, totalPage} = useAppSelect(state => state.unit.query);
    const dispatch = useAppDispatch();
    const update = (query: Partial<IQueryPage>) => dispatch(unitQueryTodo(query));
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

export default UnitPagination;