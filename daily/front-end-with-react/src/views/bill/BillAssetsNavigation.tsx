import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billAssetsQueryTodo, billAssetsSearchUpdate} from "./sliceBillAssets";

interface IProps {
    sidebarMode: boolean;
}

const BillAssetsNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.billAssets.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(billAssetsQueryTodo())}
            onChange={(it: ISearch) => dispatch(billAssetsSearchUpdate(it))}
            hide={true}
            title={'BillAssets'}
        />
    );
};


export default BillAssetsNavigation;