import React from 'react';
import SportCalibrationList from "./SportCalibrationList";
import SportCalibrationNavigation from "./SportCalibrationNavigation";
import SportCalibrationQuery from "./SportCalibrationQuery";
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";

const SportCalibrationView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <SportCalibrationList/>
        </ViewLayout>
        <SportCalibrationNavigation sidebarMode={sidebarMode}/>
        <SportCalibrationQuery/>
    </React.Fragment>);
};
export default SportCalibrationView;