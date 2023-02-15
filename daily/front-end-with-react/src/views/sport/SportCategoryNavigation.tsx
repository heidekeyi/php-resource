import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportCategoryFormShow, sportCategoryQueryTodo, sportCategorySearchUpdate} from "./sliceSportCategory";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const SportCategoryNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.sportCategory.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(sportCategoryQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(sportCategorySearchUpdate(it))}
            onNewClick={() => dispatch(sportCategoryFormShow())}
            title={title}
        />
    );
};

export default SportCategoryNavigation;