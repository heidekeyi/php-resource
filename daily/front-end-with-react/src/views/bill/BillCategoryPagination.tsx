import React from 'react';
import BarPagination from "../components/bar/BarPagination";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billCategoryQueryTodo} from "./sliceBillCategory";

const BillCategoryPagination = () => {
    const {
        pageSize,
        pageIndex,
        prevPageIndex,
        nextPageIndex,
        totalPage
    } = useAppSelect(state => state.billCategory.query);
    const dispatch = useAppDispatch();
    const update = (query: Partial<IQueryPage>) => dispatch(billCategoryQueryTodo(query));
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

export default BillCategoryPagination;