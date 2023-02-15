import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timePercentQueryTodo, timePercentSearchUpdate} from "./sliceTimePercent";

interface IProps {
    sidebarMode: boolean;
}

const TimePercentNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.timePercent.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(timePercentQueryTodo())}
            onChange={(it: ISearch) => dispatch(timePercentSearchUpdate(it))}
            hide={true}
            title={'TimePercent'}
        />
    );
};

export default TimePercentNavigation;