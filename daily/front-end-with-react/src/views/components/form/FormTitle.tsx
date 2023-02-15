import React from 'react';
import css from './FormTitle.module.css';

interface IProps {
    title: string;
    isNew: boolean;
}

const FormTitle = (props: IProps) => {
    const {title, isNew} = props;
    return (<h5 className={css.title}>{`${isNew ? 'New' : 'Update'} ${title}`}</h5>);
};

export default FormTitle;