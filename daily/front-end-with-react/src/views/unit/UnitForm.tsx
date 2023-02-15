import React, {useEffect} from 'react';
import FormPage from "../components/form/FormPage";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {
    unitFormHide, unitQueryTodo, unitService, unitFormUpdate
} from "./sliceUnit";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import FormSelect from "../components/form/FormSelect";
import {useNavigate} from "react-router-dom";
import {nameSelectPathUpdate} from "../name/sliceName";
import routeRoutes from "../../route/routeRoutes";
import {fieldNameId} from "../tree/field";

interface INameFormProps {
    title: string;
}

const UnitForm = (props: INameFormProps) => {
    const {path: namePath, item: nameItem} = useAppSelect(state => state.name.select);
    const {id, nameId, show, name} = useAppSelect(state => state.unit.form);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
                    ? await unitService.update(id, data)
                    : await unitService.insert(data);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(unitQueryTodo({}));
                }
            })();
        }
    };
    useEffect(() => {
        if (namePath && nameItem) {
            dispatch(unitFormUpdate(nameItem));
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
            onCancel={() => dispatch(unitFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormSelect
                caption={'Name'}
                value={name}
                onUpdate={onUpdate}
            />
        </FormPage>);
};

export default UnitForm;