import React from 'react';
import ViewTree from "../tree/ViewTree";
import {fieldDate, fieldSecond} from "../tree/field";
import {useAppSelect} from "../../store/hooks";
import UtilTree from "../../utils/UtilTree";

const TimeCalibrationList = () => {
    const list = useAppSelect(state => state.timeCalibration.list);
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            fieldId={fieldDate().field}
            fields={[fieldDate(), fieldSecond()]}
            hide={true}
        />
    );
};

export default TimeCalibrationList;