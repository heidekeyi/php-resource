import React from 'react';
import ViewTree from "../tree/ViewTree";
import {useAppSelect} from "../../store/hooks";
import UtilTree from "../../utils/UtilTree";
import {fieldAmount, fieldId, fieldName} from "../tree/field";

const BillAmountList = () => {
    const list = useAppSelect(state => state.billAmount.list);
    return (
        <ViewTree
            list={new UtilTree().list(list)}
            fieldId={fieldId().field}
            fields={[fieldName(), {...fieldAmount(), handler: (value: string) => ((+value) / 100).toFixed(2)}]}
            hide={true}
        />
    );
};


export default BillAmountList;