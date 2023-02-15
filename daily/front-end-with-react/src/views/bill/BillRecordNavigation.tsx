import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billRecordFormShow, billRecordQueryTodo, billRecordSearchUpdate} from "./sliceBillRecord";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const BillRecordNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.billRecord.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(billRecordQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(billRecordSearchUpdate(it))}
            onNewClick={() => dispatch(billRecordFormShow())}
            title={title}
        />
    );
};

export default BillRecordNavigation;