import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    timeRecordFormBeginTimeUpdate,
    timeRecordCategoryFormUpdate,
    timeRecordFormEndTimeUpdate,
    timeRecordFormHide, timeRecordQueryTodo,
    timeRecordService, timeRecordFormTrim,
} from "./sliceTimeRecord";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import routeRoutes from "../../route/routeRoutes";
import FormInput from "../components/form/FormInput";
import {timeCategorySelectPathUpdate} from "./sliceTimeCategory";
import UtilQuery from "../../utils/UtilQuery";
import {fieldCategoryId, fieldEndTime, fieldBeginTime} from "../tree/field";

export interface INameFormProps {
    title: string;
}

const TimeRecordForm = (props: INameFormProps) => {
    const {
        path: categoryPath,
        item: categoryItem
    } = useAppSelect(state => state.timeCategory.select);
    const {id, show, beginTime, endTime, categoryId, categoryName} = useAppSelect(state => state.timeRecord.form);
    const dispatch = useAppDispatch();
    const onBeginTimeBlur = (beginTime: string) => {
        const result = new UtilValidator()
            .data({beginTime})
            .time(fieldBeginTime().field)
            .result();
        dispatch(messageListUpdate(result.errors));
        return result;
    };
    const onEndTimeBlur = (endTime: string) => {
        const result = new UtilValidator()
            .data({endTime})
            .time(fieldEndTime().field)
            .result();
        dispatch(messageListUpdate(result.errors));
        return result;
    };
    const onSubmit = () => {
        const categoryResult = new UtilValidator()
            .data({categoryId})
            .empty(fieldCategoryId().field)
            .result();
        const beginTimeResult = onBeginTimeBlur(beginTime);
        const endTimeResult = onEndTimeBlur(endTime);
        dispatch(messageListUpdate(categoryResult.errors));
        if (categoryResult.status && beginTimeResult.status && endTimeResult.status) {
            (async () => {
                const form = {
                    ...categoryResult.data,
                    ...beginTimeResult.data,
                    ...endTimeResult.data
                };
                dispatch(loadingUpdate(true));
                const timezone = UtilQuery.timezone();
                const query = {timezone};
                const res = id
                    ? await timeRecordService.update(id, form, query)
                    : await timeRecordService.insert(form, query);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(timeRecordQueryTodo({}));
                } else {
                    dispatch(timeRecordFormTrim());
                }
            })();
        }else {
            dispatch(timeRecordFormTrim());
        }
    };
    useEffect(() => {
        if (categoryPath && categoryItem) {
            dispatch(timeRecordCategoryFormUpdate(categoryItem));
            dispatch(timeCategorySelectPathUpdate(''));
        }
    }, [categoryItem, categoryPath, dispatch]);
    const navigate = useNavigate();
    const onCategorySelect = () => {
        dispatch(timeCategorySelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.timeCategory.path, {replace: true});
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(timeRecordFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Category'}
                value={categoryName}
                onUpdate={onCategorySelect}
            />
            <FormInput
                value={beginTime}
                placeholder={'please input beginTime'}
                label={'BeginTime'}
                onBlur={onBeginTimeBlur}
                onChange={(value: string) => dispatch(timeRecordFormBeginTimeUpdate(value))}
            />
            <FormInput
                value={endTime}
                label={'EndTime'}
                placeholder={'please input endTime'}
                onBlur={onEndTimeBlur}
                onChange={(value: string) => dispatch(timeRecordFormEndTimeUpdate(value))}
            />
        </FormPage>);
};


export default TimeRecordForm;