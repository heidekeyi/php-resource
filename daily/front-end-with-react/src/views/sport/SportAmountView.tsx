import React from 'react';
import SportAmountList from "./SportAmountList";
import SportAmountNavigation from "./SportAmountNavigation";
import SportAmountQuery from "./SportAmountQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";

const SportAmountView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <SportAmountList/>
        </ViewLayout>
        <SportAmountNavigation sidebarMode={sidebarMode}/>
        <SportAmountQuery/>
    </React.Fragment>);
};

export default SportAmountView;