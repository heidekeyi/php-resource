import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {nameFormShow, nameQueryTodo, nameSearchUpdate} from "./sliceName";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const NameNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.name.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(nameQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(nameSearchUpdate(it))}
            onNewClick={() => dispatch(nameFormShow())}
            title={title}
        />
    );
};

export default NameNavigation;