import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportAmountQueryTodo, sportAmountSearchUpdate} from "./sliceSportAmount";

interface IProps {
    sidebarMode: boolean;
}

const SportAmountNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.sportAmount.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(sportAmountQueryTodo())}
            onChange={(it: ISearch) => dispatch(sportAmountSearchUpdate(it))}
            hide={true}
            title={'SportAmount'}
        />
    );
};

export default SportAmountNavigation;