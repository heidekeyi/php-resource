import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billRecordDeleteUpdate, billRecordQueryTodo, billRecordService} from "./sliceBillRecord";

const BillRecordDelete = () => {
    const {id, show} = useAppSelect(state => state.billRecord.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={billRecordService}
            onCancel={() => dispatch(billRecordDeleteUpdate())}
            onSuccess={() => dispatch(billRecordQueryTodo({}))}
        />
    );
};

export default BillRecordDelete;