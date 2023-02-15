import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {unitFormShow, unitQueryTodo, unitSearchUpdate} from "./sliceUnit";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const UnitNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.unit.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(unitQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(unitSearchUpdate(it))}
            onNewClick={() => dispatch(unitFormShow())}
            title={title}
        />
    );
};

export default UnitNavigation;