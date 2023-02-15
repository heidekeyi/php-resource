import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    billRecordFormHide,
    billRecordQueryTodo,
    billRecordService,
    billRecordFormTrim,
    billRecordDateFormUpdate,
    billRecordAmountFormUpdate,
    billRecordCategoryFormUpdate
} from "./sliceBillRecord";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import routeRoutes from "../../route/routeRoutes";
import FormInput from "../components/form/FormInput";
import {billCategorySelectPathUpdate} from "./sliceBillCategory";
import {fieldDate, fieldAmount, fieldCategoryId} from "../tree/field";
import UtilQuery from "../../utils/UtilQuery";

export interface INameFormProps {
    title: string;
}

const BillRecordForm = (props: INameFormProps) => {
    const {
        path: categoryPath,
        item: categoryItem
    } = useAppSelect(state => state.billCategory.select);
    const {
        id, amount, date, categoryId, categoryName, show,
    } = useAppSelect(state => state.billRecord.form);
    const dispatch = useAppDispatch();
    const onAmountBlur = (amount: string) => {
        const result = new UtilValidator()
            .data({amount})
            .rmb(fieldAmount().field)
            .result();
        dispatch(messageListUpdate(result.errors));
        return result;
    };
    const onDateBlur = (date: string) => {
        const result = new UtilValidator()
            .data({date})
            .date(fieldDate().field)
            .result();
        dispatch(messageListUpdate(result.errors));
        return result;
    };
    const onSubmit = () => {
        const categoryResult = new UtilValidator()
            .data({categoryId})
            .empty(fieldCategoryId().field)
            .result();
        dispatch(messageListUpdate(categoryResult.errors));
        const dateResult = onDateBlur(date);
        const amountResult = onAmountBlur(amount);
        if (categoryResult.status && dateResult.status && amountResult.status) {
            (async () => {
                const form = {
                    ...categoryResult.data,
                    ...dateResult.data,
                    ...amountResult.data
                };
                dispatch(loadingUpdate(true));
                const timezone = UtilQuery.timezone();
                const query = {timezone};
                const res = id
                    ? await billRecordService.update(id, form, query)
                    : await billRecordService.insert(form, query);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(billRecordQueryTodo({}));
                } else {
                    dispatch(billRecordFormTrim());
                }
            })();
        }else{
            dispatch(billRecordFormTrim());
        }
    };
    useEffect(() => {
        if (categoryItem && categoryPath) {
            dispatch(billRecordCategoryFormUpdate(categoryItem));
            dispatch(billCategorySelectPathUpdate(''));
        }
    }, [categoryItem, categoryPath, dispatch]);
    const navigate = useNavigate();
    const onCategorySelect = () => {
        dispatch(billCategorySelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.billCategory.path, {replace: true});
    }
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(billRecordFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Category'}
                value={categoryName}
                onUpdate={onCategorySelect}
            />
            <FormInput
                value={amount}
                placeholder={'please input amount'}
                label={'Amount'}
                onBlur={onAmountBlur}
                onChange={(value: string) => dispatch(billRecordAmountFormUpdate(value))}
            />
            <FormInput
                value={date}
                label={'Date'}
                onBlur={onDateBlur}
                placeholder={'please input date'}
                onChange={(value: string) => dispatch(billRecordDateFormUpdate(value))}
            />
        </FormPage>);
};


export default BillRecordForm;