import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billCategoryFormShow, billCategoryQueryTodo, billCategorySearchUpdate} from "./sliceBillCategory";

interface IProps {
    sidebarMode: boolean;
    title: string;
}

const BillCategoryNavigation = (props: IProps) => {
    const {sidebarMode, title} = props;
    const searchList = useAppSelect(state => state.billCategory.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={searchList}
            onSearch={() => dispatch(billCategoryQueryTodo({}))}
            onChange={(it: ISearch) => dispatch(billCategorySearchUpdate(it))}
            onNewClick={() => dispatch(billCategoryFormShow())}
            title={title}
        />
    );
};

export default BillCategoryNavigation;