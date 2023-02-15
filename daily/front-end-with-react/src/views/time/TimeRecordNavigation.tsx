import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeRecordFormShow, timeRecordQueryTodo, timeRecordSearchUpdate} from "./sliceTimeRecord";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const TimeRecordNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.timeRecord.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(timeRecordQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(timeRecordSearchUpdate(it))}
            onNewClick={() => dispatch(timeRecordFormShow())}
            title={title}
        />
    );
};

export default TimeRecordNavigation;