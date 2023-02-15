import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {nameDeleteUpdate, nameQueryTodo, nameService} from "./sliceName";

const NameDelete = () => {
    const {id, show} = useAppSelect(state => state.name.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={nameService}
            onCancel={() => dispatch(nameDeleteUpdate())}
            onSuccess={() => dispatch(nameQueryTodo({}))}
        />
    );
};

export default NameDelete;