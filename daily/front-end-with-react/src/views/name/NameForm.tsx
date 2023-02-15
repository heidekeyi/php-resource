import React from 'react';
import FormPage from "../components/form/FormPage";
import FormInput from "../components/form/FormInput";
import FormTitle from "../components/form/FormTitle";
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import {nameFormHide, nameFormNameTrim, nameFormNameChange, nameQueryTodo, nameService} from "./sliceName";
import UtilValidator from "../../utils/UtilValidator";
import {messageListUpdate, messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {fieldName} from "../tree/field";

export interface INameFormProps {
    title: string;
}

const NameForm = (props: INameFormProps) => {
    const {name, id, show} = useAppSelect(state => state.name.form);
    const dispatch = useAppDispatch();
    const onBlur = (name: string) => {
        const util = new UtilValidator();
        const result = util.data({name}).empty(fieldName().field).result();
        dispatch(messageListUpdate(result.errors));
        return result;
    };
    const onSubmit = () => {
        const {status, data} = onBlur(name);
        if (status) {
            (async () => {
                dispatch(loadingUpdate(true));
                const res = id
                    ? await nameService.update(id, data)
                    : await nameService.insert(data);
                dispatch(loadingUpdate(false));
                dispatch(messageUpdate(res));
                if (res.status) {
                    dispatch(nameQueryTodo({}));
                } else {
                    dispatch(nameFormNameTrim());
                }
            })();
        } else {
            dispatch(nameFormNameTrim());
        }
    };
    return (
        <FormPage
            onSubmit={onSubmit}
            onCancel={() => dispatch(nameFormHide())}
            show={show}>
            <FormTitle title={props.title} isNew={!id}/>
            <FormInput
                maxLength={32}
                value={name}
                label={'Name'}
                placeholder={'please input name'}
                onBlur={onBlur}
                onChange={(value: string) => dispatch(nameFormNameChange(value))}
            />
        </FormPage>);
};

export default NameForm;