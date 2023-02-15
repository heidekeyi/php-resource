import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    sportCategoryFormHide,
    sportCategoryFormUpdate,
    sportCategoryQueryTodo,
    sportCategoryService
} from "./sliceSportCategory";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import {nameSelectPathUpdate} from "../name/sliceName";
import routeRoutes from "../../route/routeRoutes";
import {fieldNameId} from "../tree/field";

export interface INameFormProps {
    title: string;
}

const SportCategoryForm = (props: INameFormProps) => {
    const {path: namePath, item: nameItem} = useAppSelect(state => state.name.select);
    const {name, show, id, nameId} = useAppSelect(state => state.sportCategory.form);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit = () => {
        const form = {nameId};
        const {status, data, errors} = new UtilValidator()
            .data(form)
            .empty(fieldNameId().field)
            .result();
        dispatch(messageListUpdate(errors));
        if (status) {
            (async () => {
                dispatch(loadingUpdate(true));
                const res = id
                    ? await sportCategoryService.update(id, data)
                    : await sportCategoryService.insert(data);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(sportCategoryQueryTodo({}));
                }
            })();
        }
    };
    useEffect(() => {
        if (namePath && nameItem) {
            dispatch(sportCategoryFormUpdate(nameItem));
            dispatch(nameSelectPathUpdate(''));
        }
    }, [dispatch, nameItem, namePath]);
    const onUpdate = () => {
        dispatch(nameSelectPathUpdate(routeRoutes.uri()));
        navigate(routeRoutes.name.path, {replace: true});
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(sportCategoryFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Name'}
                value={name}
                onUpdate={onUpdate}
            />
        </FormPage>);
};


export default SportCategoryForm;