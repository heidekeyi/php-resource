import React from 'react';
import css from './BarSearchList.module.css';
import BarButton from "./BarButton";
import {useAppDispatch} from "../../../store/hooks";
import {messageUpdate} from "../../../components/message/sliceMessage";

interface IProps {
    list: ISearch[];
    onChange: (it: ISearch) => any;
    onSearch: () => any;
}

const BarSearchList = (props: IProps) => {
    const {list, onSearch, onChange} = props;
    const dispatch = useAppDispatch();
    if (!list.length) {
        return null;
    }
    const bindChange = (it: ISearch) => (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({...it, value: e.currentTarget.value});
    };
    const bindDateValidate = (it: ISearch) => () => {
        const value = it.value.trim();
        if (value && !value.match(/^\s*\d{4}(-\d{1,2}){0,2}\s*$/)) {
            const message = `${it.field} = ${it.value} is not match date format`;
            dispatch(messageUpdate({status: false, message}));
        }
    };
    return (
        <div className={css.page}>
            {list.map(it => (
                <div className={css.boxInput} key={it.field}>
                    <input
                        placeholder={it.placeholder}
                        value={it.value}
                        onBlur={it.date ? bindDateValidate(it) : undefined}
                        onChange={bindChange(it)}
                        className={css.input}
                        maxLength={it.maxLength}
                    />
                </div>
            ))}
            <BarButton onClick={() => onSearch()} text={'search'}/>
        </div>
    );
}

export default BarSearchList;