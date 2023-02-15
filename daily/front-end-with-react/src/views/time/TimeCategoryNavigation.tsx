import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeCategoryFormShow, timeCategoryQueryTodo, timeCategorySearchUpdate} from "./sliceTimeCategory";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const TimeCategoryNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.timeCategory.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(timeCategoryQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(timeCategorySearchUpdate(it))}
            onNewClick={() => dispatch(timeCategoryFormShow())}
            title={title}
        />
    );
};

export default TimeCategoryNavigation;