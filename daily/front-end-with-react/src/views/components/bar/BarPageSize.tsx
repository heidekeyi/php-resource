import React from 'react';
import BarSelect from "./BarSelect";

let pageSizeList = [5, 8, 10, 12, 15, 18, 20, 25, 30, 50, 100, 200, 999]
    .map(it => {
        return {caption: `${it}/page`, value: it.toString()};
    });

interface IProps {
    pageSize: string;
    onChange: (value: string) => any;
}

const BarPageSize = (props: IProps) => {
    const {pageSize, onChange} = props;
    if (pageSizeList.filter(it => it.value === pageSize).length <= 0) {
        pageSizeList = [{caption: `${pageSize}/page`, value: pageSize}, ...pageSizeList];
    }
    return (
        <BarSelect
            onChange={onChange}
            style={{width: '135px'}}
            value={pageSize}
            up={true}
            options={pageSizeList}
        />
    );
};

export default BarPageSize;