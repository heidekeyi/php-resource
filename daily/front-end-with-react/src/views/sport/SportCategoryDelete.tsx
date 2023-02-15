import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportCategoryDeleteUpdate, sportCategoryQueryTodo, sportCategoryService} from "./sliceSportCategory";

const SportCategoryDelete = () => {
    const {id, show} = useAppSelect(state => state.sportCategory.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={sportCategoryService}
            onCancel={() => dispatch(sportCategoryDeleteUpdate())}
            onSuccess={() => dispatch(sportCategoryQueryTodo({}))}
        />
    );
};

export default SportCategoryDelete;