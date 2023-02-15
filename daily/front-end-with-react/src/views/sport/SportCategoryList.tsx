import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {sportCategoryDeleteUpdate, sportCategoryFormShow, sportCategorySelectItemUpdate} from "./sliceSportCategory";
import {useNavigate} from "react-router-dom";
import UtilTree from "../../utils/UtilTree";
import {fieldName, fieldId, fieldCreateTime} from "../tree/field";

const SportCategoryList = () => {
    const list = useAppSelect(state => state.sportCategory.query.list);
    const path = useAppSelect(state => state.sportCategory.select.path);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSelect = (it: IObject) => {
        dispatch(sportCategorySelectItemUpdate(it));
        navigate(path, {replace: true});
    };
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onSelectClick={path ? onSelect : undefined}
            onDeleteClick={(it: IObject) => dispatch(sportCategoryDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(sportCategoryFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldName()]}
        />
    );
};


export default SportCategoryList;