import React from 'react';
import TimeAmountList from "./TimeAmountList";
import TimeAmountNavigation from "./TimeAmountNavigation";
import TimeAmountQuery from "./TimeAmountQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";

const TimeAmountView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <TimeAmountList/>
        </ViewLayout>
        <TimeAmountNavigation sidebarMode={sidebarMode}/>
        <TimeAmountQuery/>
    </React.Fragment>);
};

export default TimeAmountView;