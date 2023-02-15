import React from 'react';
import css from './FormLabel.module.css';

interface IProps {
    caption: string;
    onUpdateClick?: () => any;
    onInitClick?: () => any;
}

const FormLabel = (props: IProps) => {
    const {caption, onUpdateClick, onInitClick} = props;
    return (
        <div className={css.page}>
            <span className={css.caption}>{caption}</span>
            <div className={css.boxBtn}>
                {onInitClick && <span className={css.btn} onClick={onInitClick}>initialize</span>}
                {onUpdateClick && <span className={css.btn} onClick={onUpdateClick}>update</span>}
            </div>
        </div>
    );
};

export default FormLabel;