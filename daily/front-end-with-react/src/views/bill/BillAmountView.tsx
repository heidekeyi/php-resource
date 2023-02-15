import React from 'react';
import BillAmountList from "./BillAmountList";
import BillAmountNavigation from "./BillAmountNavigation";
import BillAmountQuery from "./BillAmountQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";

const BillAmountView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <BillAmountList/>
        </ViewLayout>
        <BillAmountNavigation sidebarMode={sidebarMode}/>
        <BillAmountQuery/>
    </React.Fragment>);
};

export default BillAmountView;