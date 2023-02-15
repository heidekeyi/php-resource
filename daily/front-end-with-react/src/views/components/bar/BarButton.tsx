import React from 'react';
import css from './BarButton.module.css';

interface IProps {
    disable?: boolean;
    onClick?: () => any;
    text: string;
}

const BarButton = (props: IProps) => {
    const {text, onClick, disable} = props;
    return (
        <div className={css.page}>
            <span onClick={!disable && onClick ? onClick : undefined}
                  className={disable ? css.disable : css.normal}>{text}</span>
        </div>
    );
}

export default BarButton;