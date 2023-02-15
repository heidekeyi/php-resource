import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {unitDeleteUpdate, unitFormShow, unitSelectItemUpdate} from "./sliceUnit";
import {useNavigate} from "react-router-dom";
import UtilTree from "../../utils/UtilTree";
import {fieldName, fieldId, fieldCreateTime} from "../tree/field";

const UnitList = () => {
    const list = useAppSelect(state => state.unit.query.list);
    const path = useAppSelect(state => state.unit.select.path);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSelect = (it: IObject) => {
        dispatch(unitSelectItemUpdate(it));
        navigate(path, {replace: true});
    };
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onSelectClick={path ? onSelect : undefined}
            onDeleteClick={(it: IObject) => dispatch(unitDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(unitFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldName()]}
        />
    );
};


export default UnitList;