import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {unitDeleteUpdate, unitQueryTodo, unitService} from "./sliceUnit";

const UnitDelete = () => {
    const {id, show} = useAppSelect(state => state.unit.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={unitService}
            onCancel={() => dispatch(unitDeleteUpdate())}
            onSuccess={() => dispatch(unitQueryTodo({}))}
        />
    );
};


export default UnitDelete;