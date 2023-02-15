import React from 'react';
import FormLabel from "./FormLabel";
import css from './FormSelect.module.css';

interface IProps {
    onUpdate: () => any;
    onInit?: () => any;
    caption: string;
    value: string;
}

const FormSelect = (props: IProps) => {
    const {onUpdate, caption, value, onInit} = props;
    return (<React.Fragment>
        <FormLabel caption={caption} onUpdateClick={onUpdate} onInitClick={onInit}/>
        <p className={css.page}>{value}</p>
    </React.Fragment>)
};

export default FormSelect;