import React from 'react';
import BarNavigation from "../components/bar/BarNavigation";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportCalibrationQueryTodo, sportCalibrationSearchUpdate} from "./sliceSportCalibration";

interface IProps {
    sidebarMode: boolean;
}

const SportCalibrationNavigation = (props: IProps) => {
    const sidebarMode = props.sidebarMode;
    const list = useAppSelect(state => state.sportCalibration.searchList);
    const dispatch = useAppDispatch();
    return (
        <BarNavigation
            sidebarMode={sidebarMode}
            list={list}
            onSearch={() => dispatch(sportCalibrationQueryTodo())}
            onChange={(it: ISearch) => dispatch(sportCalibrationSearchUpdate(it))}
            hide={true}
            title={'SportCalibration'}
        />
    );
};


export default SportCalibrationNavigation;