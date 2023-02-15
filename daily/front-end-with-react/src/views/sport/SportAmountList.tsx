import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppSelect} from "../../store/hooks";
import UtilTree from "../../utils/UtilTree";
import {fieldCategoryName, fieldUnitName, fieldAmount, fieldId} from "../tree/field";

const SportAmountList = () => {
    const list = useAppSelect(state => state.sportAmount.list).map((it, ix) => {
        return {...it, id: ix.toString()};
    });
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            fieldId={fieldId().field}
            fields={[fieldCategoryName(), fieldAmount(), fieldUnitName()]}
            hide={true}
        />
    );
};


export default SportAmountList;