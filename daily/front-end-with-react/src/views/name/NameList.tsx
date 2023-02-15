import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {nameDeleteUpdate, nameFormShow, nameSelectItemUpdate} from "./sliceName";
import {useNavigate} from "react-router-dom";
import UtilTree from "../../utils/UtilTree";
import {fieldCreateTime, fieldId, fieldName} from "../tree/field";

const NameList = () => {
    const list = useAppSelect(state => state.name.query.list);
    const path = useAppSelect(state => state.name.select.path);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onSelect = (it: IObject) => {
        dispatch(nameSelectItemUpdate(it));
        navigate(path, {replace: true});
    };
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            onSelectClick={path ? onSelect : undefined}
            onDeleteClick={(it: IObject) => dispatch(nameDeleteUpdate(it))}
            onUpdateClick={(it: IObject) => dispatch(nameFormShow(it))}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldCreateTime(), fieldName()]}
        />
    );
};

export default NameList;