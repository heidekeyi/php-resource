import React from 'react';
import TimeCalibrationList from "./TimeCalibrationList";
import TimeCalibrationNavigation from "./TimeCalibrationNavigation";
import TimeCalibrationQuery from "./TimeCalibrationQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";

const TimeCalibrationView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <TimeCalibrationList/>
        </ViewLayout>
        <TimeCalibrationNavigation sidebarMode={sidebarMode}/>
        <TimeCalibrationQuery/>
    </React.Fragment>);
};

export default TimeCalibrationView;