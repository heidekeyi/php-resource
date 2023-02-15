import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    timeCategoryDeleteUpdate,
    timeCategoryFormShow,
    timeCategorySelectItemUpdate,
    timeCategoryParentFormUpdate,
    timeCategoryFormToggle
} from "./sliceTimeCategory";
import {useNavigate} from "react-router-dom";
import UtilTree from "../../utils/UtilTree";
import routeRoutes from "../../route/routeRoutes";
import {fieldCreateTime, fieldId, fieldName, fieldParentId, fieldParentName} from "../tree/field";

const TimeCategoryList = () => {
    const path = useAppSelect(state => state.timeCategory.select.path);
    const list = useAppSelect(state => state.timeCategory.query.list);
        const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSelect = (it: IObject) => {
        dispatch(timeCategorySelectItemUpdate(it));
        const pathname = path.split('?')[0] || '';
        if (pathname === routeRoutes.timeCategory.path) {
            dispatch(timeCategoryFormToggle());
        } else {
            navigate(path, {replace: true});
        }
    };
    const tree = new UtilTree()
        .fieldParentId(fieldParentId().field)
        .fieldId(fieldId().field)
        .list(list);
    const onNewClick = (it: IObject) => {
        dispatch(timeCategoryFormShow());
        dispatch(timeCategoryParentFormUpdate(it));
    };
    return (
        <ViewTree
            list={tree}
            onSelectClick={path ? onSelect : undefined}
            onDeleteClick={(it: IObject) => dispatch(timeCategoryDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(timeCategoryFormShow(it))}
            onNewClick={onNewClick}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldParentName(), fieldName()]}
        />
    );
};


export default TimeCategoryList;