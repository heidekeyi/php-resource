import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeAmountQueryTodo, timeAmountSearchUpdate} from "./sliceTimeAmount";

interface IProps {
    sidebarMode: boolean;
}

const TimeAmountNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.timeAmount.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(timeAmountQueryTodo())}
            onChange={(it: ISearch) => dispatch(timeAmountSearchUpdate(it))}
            hide={true}
            title={'TimeAmount'}
        />
    );
};

export default TimeAmountNavigation;