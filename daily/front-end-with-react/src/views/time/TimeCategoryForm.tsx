import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    timeCategoryFormHide,
    timeCategoryQueryTodo,
    timeCategoryService,
    timeCategorySelectPathUpdate,
    timeCategoryParentFormUpdate,
    timeCategoryNameFormUpdate,
    timeCategoryFormToggle
} from "./sliceTimeCategory";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import {nameSelectPathUpdate} from "../name/sliceName";
import routeRoutes from "../../route/routeRoutes";
import {fieldNameId, fieldParentId} from "../tree/field";

export interface INameFormProps {
    title: string;
}

const TimeCategoryForm = (props: INameFormProps) => {
    const {
        path: namePath,
        item: nameItem
    } = useAppSelect(state => state.name.select);
    const {
        path: categoryPath,
        item: categoryItem
    } = useAppSelect(state => state.timeCategory.select);
    const {
        name, nameId, parentName, parentId, show, id
    } = useAppSelect(state => state.timeCategory.form);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit = () => {
        const form = {nameId, parentId};
        const {status, data, errors} = new UtilValidator()
            .data(form)
            .empty(fieldNameId().field)
            .empty(fieldParentId().field)
            .result();
        dispatch(messageListUpdate(errors));
        if (status) {
            (async () => {
                dispatch(loadingUpdate(true));
                const res = id
                    ? await timeCategoryService.update(id, data)
                    : await timeCategoryService.insert(data);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(timeCategoryQueryTodo({}));
                }
            })();
        }
    };
    useEffect(() => {
        if (namePath && nameItem) {
            dispatch(timeCategoryNameFormUpdate(nameItem));
            dispatch(nameSelectPathUpdate(''));
        }
        if (categoryPath && categoryItem) {
            dispatch(timeCategoryParentFormUpdate(categoryItem));
            dispatch(timeCategorySelectPathUpdate(''));
        }
    }, [dispatch, nameItem, namePath, categoryPath, categoryItem]);
    const onNameUpdate = () => {
        dispatch(nameSelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.name.path, {replace: true});
    };
    const onUpdate = () => {
        dispatch(timeCategoryFormToggle());
        dispatch(timeCategorySelectPathUpdate(routeRoutes.uri()));
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(timeCategoryFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Parent'}
                value={parentName}
                onUpdate={onUpdate}
                onInit={() => dispatch(timeCategoryParentFormUpdate())}
            />
            <FormSelect
                caption={'Name'}
                value={name}
                onUpdate={onNameUpdate}
            />
        </FormPage>);
};


export default TimeCategoryForm;