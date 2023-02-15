import React from 'react';
import css from './BarPageIndex.module.css';
import BarButton from "./BarButton";

interface IProps {
    pageIndex: string;
    prevPageIndex: string;
    nextPageIndex: string;
    totalPage: string;
    onChange: (value: string) => any;
}


const BarPageIndex = (props: IProps) => {
    const {pageIndex, prevPageIndex, nextPageIndex, totalPage, onChange} = props;
    return (
        <div className={css.page}>
            <BarButton disable={+prevPageIndex !== +pageIndex - 1}
                       onClick={() => onChange(prevPageIndex)}
                       text={'prev'}/>
            <p className={css.caption}>{pageIndex}/{totalPage}</p>
            <BarButton disable={+nextPageIndex !== +pageIndex + 1}
                       onClick={() => onChange(nextPageIndex)}
                       text={'next'}/>
        </div>
    );
};

export default BarPageIndex;