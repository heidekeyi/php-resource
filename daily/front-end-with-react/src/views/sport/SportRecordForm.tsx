import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    sportRecordFormHide,
    sportRecordService,
    sportRecordQueryTodo,
    sportRecordUnitFormUpdate,
    sportRecordDateFormUpdate,
    sportRecordAmountFormUpdate,
    sportRecordCategoryFormUpdate,
    sportRecordFormTrim,
} from "./sliceSportRecord";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import routeRoutes from "../../route/routeRoutes";
import FormInput from "../components/form/FormInput";
import {unitSelectPathUpdate} from "../unit/sliceUnit";
import {fieldAmount, fieldDate, fieldUnitId, fieldCategoryId} from "../tree/field";
import UtilQuery from "../../utils/UtilQuery";
import {sportCategorySelectPathUpdate} from "./sliceSportCategory";

export interface INameFormProps {
    title: string;
}

const SportRecordForm = (props: INameFormProps) => {
    const {
        path: categoryPath,
        item: categoryItem,
    } = useAppSelect(state => state.sportCategory.select);
    const {
        path: unitPath,
        item: unitItem
    } = useAppSelect(state => state.unit.select);
    const {
        show, id, amount, date, categoryName, categoryId, unitName, unitId
    } = useAppSelect(state => state.sportRecord.form);
    const dispatch = useAppDispatch();
    const onAmountBlur = (amount: string) => {
        const result = new UtilValidator()
            .data({amount})
            .integer(fieldAmount().field)
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
            .data({categoryId, unitId})
            .empty(fieldCategoryId().field)
            .empty(fieldUnitId().field)
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
                    ? await sportRecordService.update(id, form, query)
                    : await sportRecordService.insert(form, query);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(sportRecordQueryTodo({}));
                } else {
                    dispatch(sportRecordFormTrim());
                }
            })();
        } else {
            dispatch(sportRecordFormTrim());
        }
    };
    useEffect(() => {
        if (unitPath && unitItem) {
            dispatch(sportRecordUnitFormUpdate(unitItem));
            dispatch(unitSelectPathUpdate(''));
        }
        if (categoryPath && categoryItem) {
            dispatch(sportRecordCategoryFormUpdate(categoryItem));
            dispatch(sportCategorySelectPathUpdate(''));
        }
    }, [categoryItem, categoryPath, dispatch, unitItem, unitPath]);
    const navigate = useNavigate();
    const onUnitSelect = () => {
        dispatch(unitSelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.unit.path, {replace: true});
    };
    const onCategorySelect = () => {
        dispatch(sportCategorySelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.sportCategory.path, {replace: true});
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(sportRecordFormHide())}
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
                onChange={(value: string) => dispatch(sportRecordAmountFormUpdate(value))}
            />
            <FormSelect
                caption={'Unit'}
                value={unitName}
                onUpdate={onUnitSelect}
            />
            <FormInput
                value={date}
                label={'Date'}
                placeholder={'please input date'}
                onBlur={onDateBlur}
                onChange={(value: string) => dispatch(sportRecordDateFormUpdate(value))}
            />
        </FormPage>);
};


export default SportRecordForm;