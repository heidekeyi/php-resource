import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeRecordDeleteUpdate, timeRecordFormShow} from "./sliceTimeRecord";
import UtilTree from "../../utils/UtilTree";
import {fieldId, fieldCreateTime, fieldBeginTime, fieldEndTime, fieldCategoryName} from "../tree/field";

const TimeRecordList = () => {
    const list = useAppSelect(state => state.timeRecord.query.list);
    const dispatch = useAppDispatch();
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onDeleteClick={(it: IObject) => dispatch(timeRecordDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(timeRecordFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldCategoryName(), fieldBeginTime(), fieldEndTime()]}
        />
    );
};

export default TimeRecordList;