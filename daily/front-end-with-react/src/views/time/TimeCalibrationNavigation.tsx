import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeCalibrationQueryTodo, timeCalibrationSearchUpdate} from "./sliceTimeCalibration";

interface IProps {
    sidebarMode: boolean;
}

const TimeCalibrationNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.timeCalibration.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(timeCalibrationQueryTodo())}
            onChange={(it: ISearch) => dispatch(timeCalibrationSearchUpdate(it))}
            hide={true}
            title={'TimeCalibration'}
        />
    );
};

export default TimeCalibrationNavigation;