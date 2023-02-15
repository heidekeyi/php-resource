import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billAmountQueryTodo, billAmountSearchUpdate} from "./sliceBillAmount";

interface IProps {
    sidebarMode: boolean;
}

const BillAmountNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.billAmount.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(billAmountQueryTodo())}
            onChange={(it: ISearch) => dispatch(billAmountSearchUpdate(it))}
            hide={true}
            title={'BillAmount'}
        />
    );
};

export default BillAmountNavigation;