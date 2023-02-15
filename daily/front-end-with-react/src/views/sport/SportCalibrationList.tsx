import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppSelect} from "../../store/hooks";
import UtilTree from "../../utils/UtilTree";
import {fieldDate, fieldCategoryName, fieldUnitName, fieldAmount, fieldId} from "../tree/field";

const SportCalibrationList = () => {
    const list = useAppSelect(state => state.sportCalibration.list);
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            fieldId={fieldId().field}
            fields={[fieldDate(), fieldCategoryName(), fieldAmount(), fieldUnitName()]}
            hide={true}
        />
    );
};

export default SportCalibrationList;