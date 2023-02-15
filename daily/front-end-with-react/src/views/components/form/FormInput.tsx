import React from 'react';
import css from './FormInput.module.css';
import FormLabel from "./FormLabel";

interface IProps {
    value: string;
    label: string;
    placeholder?: string;
    maxLength?: number;
    onChange: (value: string) => any;
    onBlur?: (value: string) => any;
}

const FormInput = (props: IProps) => {
    const {value, label, placeholder, maxLength, onChange, onBlur} = props;
    return (<div className={css.page}>
        <FormLabel caption={label}/>
        <div className={css.inputBox}>
            <input
                className={css.input}
                placeholder={placeholder}
                maxLength={maxLength}
                onBlur={onBlur ? () => onBlur(value) : undefined}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
                value={value}
            />
        </div>
    </div>);
}

export default FormInput;