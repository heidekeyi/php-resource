import React from 'react';
import css from './BarTitle.module.css';

interface IProps {
    title: string;
}

const BarTitle = (props: IProps) => {
    return (
        <h2 className={css.title}>{props.title}</h2>
    );
}

export default BarTitle;