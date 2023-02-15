import React from 'react';
import css from './BarPagination.module.css';
import BarPageIndex from "./BarPageIndex";
import BarPageSize from "./BarPageSize";

interface IProps {
    pageIndex: string;
    prevPageIndex: string;
    nextPageIndex: string;
    totalPage: string;
    onPageIndexChange: (value: string) => any;
    pageSize: string;
    onPageSizeChange: (value: string) => any;
}

const BarPagination = (props: IProps) => {
    const {
        pageIndex, onPageIndexChange, onPageSizeChange,
        prevPageIndex, nextPageIndex, totalPage, pageSize
    } = props;
    return (
        <div className={css.page}>
            <BarPageSize
                pageSize={pageSize}
                onChange={onPageSizeChange}
            />
            <BarPageIndex
                pageIndex={pageIndex}
                prevPageIndex={prevPageIndex}
                nextPageIndex={nextPageIndex}
                totalPage={totalPage}
                onChange={onPageIndexChange}
            />
        </div>
    );
};

export default BarPagination;