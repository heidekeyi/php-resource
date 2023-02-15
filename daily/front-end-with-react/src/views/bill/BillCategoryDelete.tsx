import React from 'react';
import ViewDelete from "../components/ViewDelete";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {billCategoryDeleteUpdate, billCategoryQueryTodo, billCategoryService} from "./sliceBillCategory";

const BillCategoryDelete = () => {
    const {id, show} = useAppSelect(state => state.billCategory.delete);
    const dispatch = useAppDispatch();
    return (
        <ViewDelete
            id={id}
            show={show}
            service={billCategoryService}
            onCancel={() => dispatch(billCategoryDeleteUpdate())}
            onSuccess={() => dispatch(billCategoryQueryTodo({}))}
        />
    );
};

export default BillCategoryDelete;