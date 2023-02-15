import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import BillRecordForm from "./BillRecordForm";
import BillRecordList from "./BillRecordList";
import BillRecordDelete from "./BillRecordDelete";
import BillRecordPagination from "./BillRecordPagination";
import BillRecordNavigation from "./BillRecordNavigation";
import BillRecordQuery from "./BillRecordQuery";

const BillRecordView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'BillRecord';
    return (
        <React.Fragment>
            <BillRecordQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <BillRecordList/>
                <BillRecordPagination/>
            </ViewLayout>
            <BillRecordNavigation sidebarMode={sidebarMode} title={title}/>
            <BillRecordForm title={title}/>
            <BillRecordDelete/>
        </React.Fragment>
    );
};

export default BillRecordView;