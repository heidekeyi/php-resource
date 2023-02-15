import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import TimeRecordForm from "./TimeRecordForm";
import TimeRecordList from "./TimeRecordList";
import TimeRecordDelete from "./TimeRecordDelete";
import TimeRecordPagination from "./TimeRecordPagination";
import TimeRecordNavigation from "./TimeRecordNavigation";
import TimeRecordQuery from "./TimeRecordQuery";

const TimeRecordView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'TimeRecord';
    return (
        <React.Fragment>
            <TimeRecordQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <TimeRecordList/>
                <TimeRecordPagination/>
            </ViewLayout>
            <TimeRecordNavigation sidebarMode={sidebarMode} title={title}/>
            <TimeRecordForm title={title}/>
            <TimeRecordDelete/>
        </React.Fragment>
    );
};

export default TimeRecordView;