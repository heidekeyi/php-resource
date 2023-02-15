import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billRecordDeleteUpdate, billRecordFormShow} from "./sliceBillRecord";
import UtilTree from "../../utils/UtilTree";
import {fieldId, fieldCreateTime, fieldCategoryName, fieldAmount, fieldDate} from "../tree/field";

const BillRecordList = () => {
    const list = useAppSelect(state => state.billRecord.query.list);
    const dispatch = useAppDispatch();
    const amount = {
        ...fieldAmount(),
        handler: (value: string)=>`${(+value / 100).toFixed(2)}`
    }
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onDeleteClick={(it: IObject) => dispatch(billRecordDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(billRecordFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldCategoryName(), amount, fieldDate()]}
        />
    );
};

export default BillRecordList;