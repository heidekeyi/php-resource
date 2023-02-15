import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeRecordDeleteUpdate, timeRecordQueryTodo, timeRecordService} from "./sliceTimeRecord";

const TimeRecordDelete = () => {
    const {id, show} = useAppSelect(state => state.timeRecord.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={timeRecordService}
            onCancel={() => dispatch(timeRecordDeleteUpdate())}
            onSuccess={() => dispatch(timeRecordQueryTodo({}))}
        />
    );
};

export default TimeRecordDelete;