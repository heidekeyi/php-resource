import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportRecordDeleteUpdate, sportRecordQueryTodo, sportRecordService} from "./sliceSportRecord";

const SportRecordDelete = () => {
    const {id, show} = useAppSelect(state => state.sportRecord.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={sportRecordService}
            onCancel={() => dispatch(sportRecordDeleteUpdate())}
            onSuccess={() => dispatch(sportRecordQueryTodo({}))}
        />
    );
};

export default SportRecordDelete;