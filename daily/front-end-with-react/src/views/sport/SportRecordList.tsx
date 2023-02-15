import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportRecordDeleteUpdate, sportRecordFormShow} from "./sliceSportRecord";
import UtilTree from "../../utils/UtilTree";
import {fieldId, fieldCreateTime, fieldCategoryName, fieldAmount, fieldDate, fieldUnitName} from "../tree/field";

const SportRecordList = () => {
    const list = useAppSelect(state => state.sportRecord.query.list);
    const dispatch = useAppDispatch();
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onDeleteClick={(it: IObject) => dispatch(sportRecordDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(sportRecordFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldCategoryName(), fieldAmount(), fieldUnitName(), fieldDate()]}
        />
    );
};

export default SportRecordList;