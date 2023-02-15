import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    billCategoryFormShow,
    billCategorySelectItemUpdate,
    billCategoryDeleteUpdate,
    billCategoryFormToggle,
    billCategoryParentFormUpdate,
} from "./sliceBillCategory";
import {useNavigate} from "react-router-dom";
import UtilTree from "../../utils/UtilTree";
import routeRoutes from "../../route/routeRoutes";
import {fieldCreateTime, fieldId, fieldName, fieldParentId, fieldParentName} from "../tree/field";

const BillCategoryList = () => {
    const path = useAppSelect(state => state.billCategory.select.path);
    const list = useAppSelect(state => state.billCategory.query.list);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSelect = (it: IObject) => {
        dispatch(billCategorySelectItemUpdate(it));
        const pathname = path.split('?')[0] || '';
        if (pathname === routeRoutes.billCategory.path) {
            dispatch(billCategoryFormToggle());
        } else {
            navigate(path, {replace: true});
        }
    };
    const tree = new UtilTree()
        .fieldParentId(fieldParentId().field)
        .fieldId(fieldId().field)
        .list(list);
    const onNewClick = (it: IObject) => {
        dispatch(billCategoryFormShow());
        dispatch(billCategoryParentFormUpdate(it));
    };
    return (
        <ViewTree
            list={tree}
            onSelectClick={path ? onSelect : undefined}
            onDeleteClick={(it: IObject) => dispatch(billCategoryDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(billCategoryFormShow(it))}
            onNewClick={onNewClick}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldParentName(), fieldName()]}
        />
    );
};


export default BillCategoryList;