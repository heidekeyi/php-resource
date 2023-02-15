import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import SportRecordForm from "./SportRecordForm";
import SportRecordList from "./SportRecordList";
import SportRecordDelete from "./SportRecordDelete";
import SportRecordPagination from "./SportRecordPagination";
import SportRecordNavigation from "./SportRecordNavigation";
import SportRecordQuery from "./SportRecordQuery";

const SportRecordView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'SportRecord';
    return (
        <React.Fragment>
            <SportRecordQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <SportRecordList/>
                <SportRecordPagination/>
            </ViewLayout>
            <SportRecordNavigation sidebarMode={sidebarMode} title={title}/>
            <SportRecordForm title={title}/>
            <SportRecordDelete/>
        </React.Fragment>
    );
};

export default SportRecordView;