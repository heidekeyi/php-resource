import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportTraceQueryTodo, sportTraceSearchUpdate} from "./sliceSportTrace";

interface IProps {
    sidebarMode: boolean;
}

const SportTraceNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.sportTrace.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(sportTraceQueryTodo())}
            onChange={(it: ISearch) => dispatch(sportTraceSearchUpdate(it))}
            hide={true}
            title={'SportTrace'}
        />
    );
};


export default SportTraceNavigation;