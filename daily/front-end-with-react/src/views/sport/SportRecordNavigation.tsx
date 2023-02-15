import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportRecordFormShow, sportRecordQueryTodo, sportRecordSearchUpdate} from "./sliceSportRecord";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const SportRecordNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.sportRecord.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(sportRecordQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(sportRecordSearchUpdate(it))}
            onNewClick={() => dispatch(sportRecordFormShow())}
            title={title}
        />
    );
};

export default SportRecordNavigation;