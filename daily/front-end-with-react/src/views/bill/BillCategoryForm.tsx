import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    billCategoryFormHide,
    billCategoryParentFormUpdate,
    billCategoryQueryTodo,
    billCategorySelectPathUpdate,
    billCategoryFormToggle,
    billCategoryNameFormUpdate,
    billCategoryService,
} from "./sliceBillCategory";
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

const BillCategoryForm = (props: INameFormProps) => {
    const {
        path: namePath,
        item: nameItem
    } = useAppSelect(state => state.name.select);
    const {
        path: categoryPath,
        item: categoryItem
    } = useAppSelect(state => state.billCategory.select);
    const {
        name, nameId, parentName, parentId, show, id
    } = useAppSelect(state => state.billCategory.form);
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
                    ? await billCategoryService.update(id, data)
                    : await billCategoryService.insert(data);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(billCategoryQueryTodo({}));
                }
            })();
        }
    };
    useEffect(() => {
        if (namePath && nameItem) {
            dispatch(billCategoryNameFormUpdate(nameItem));
            dispatch(nameSelectPathUpdate(''));
        }
        if (categoryPath && categoryItem) {
            dispatch(billCategoryParentFormUpdate(categoryItem));
            dispatch(billCategorySelectPathUpdate(''));
        }
    }, [categoryItem, categoryPath, dispatch, nameItem, namePath]);
    const onNameUpdate = () => {
        dispatch(nameSelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.name.path, {replace: true});
    };
    const onCategoryUpdate = () => {
        dispatch(billCategorySelectPathUpdate(routeRoutes.uri()));
        dispatch(billCategoryFormToggle());
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(billCategoryFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Parent'}
                value={parentName}
                onUpdate={onCategoryUpdate}
                onInit={() => dispatch(billCategoryParentFormUpdate())}
            />
            <FormSelect
                caption={'Name'}
                value={name}
                onUpdate={onNameUpdate}
            />
        </FormPage>);
};


export default BillCategoryForm;