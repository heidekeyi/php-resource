import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import UnitForm from "./UnitForm";
import UnitList from "./UnitList";
import UnitDelete from "./UnitDelete";
import UnitPagination from "./UnitPagination";
import UnitNavigation from "./UnitNavigation";
import UnitQuery from "./UnitQuery";

const UnitView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'Unit';
    return (
        <React.Fragment>
            <UnitQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <UnitList/>
                <UnitPagination/>
            </ViewLayout>
            <UnitNavigation sidebarMode={sidebarMode} title={title}/>
            <UnitForm title={title}/>
            <UnitDelete/>
        </React.Fragment>
    );
};

export default UnitView;