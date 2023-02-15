import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppSelect} from "../../store/hooks";
import UtilTree from "../../utils/UtilTree";
import {fieldName, fieldId, fieldAmount} from "../tree/field";

const TimeAmountList = () => {
    const field = fieldAmount().field;
    const list = useAppSelect(state => state.timeAmount.list).map(it => {
        const second = +it[field];
        return {...it, [field]: (second / 60 / 60).toFixed(2)};
    });
    const tree = new UtilTree().fieldId('id').fieldParentId('pid').list(list);
    return (
        <ViewTree
            list={tree}
            fieldId={fieldId().field}
            fields={[fieldId(), fieldName(), fieldAmount()]}
            hide={true}
        />
    );
};


export default TimeAmountList;