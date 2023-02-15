import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {timeCategoryDeleteUpdate, timeCategoryQueryTodo, timeCategoryService} from "./sliceTimeCategory";

const TimeCategoryDelete = () => {
    const {id, show} = useAppSelect(state => state.timeCategory.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={timeCategoryService}
            onCancel={() => dispatch(timeCategoryDeleteUpdate())}
            onSuccess={() => dispatch(timeCategoryQueryTodo({}))}
        />
    );
};

export default TimeCategoryDelete;