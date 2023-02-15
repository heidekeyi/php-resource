import React from 'react';
import css from './FormPage.module.css';
import Shadow, {stopPropagation} from "../../../components/shadow/Shadow";

interface IProps {
    onSubmit: () => any;
    onCancel: () => any;
    show: boolean;
    children?: React.ReactNode;
}

const FormPage = (props: IProps) => {
    const {show, onSubmit, onCancel, children} = props;
    return (<Shadow show={show} onShadowClick={onCancel}>
        <div className={css.page}>
            <div onClick={stopPropagation}
                 className={css.content}>
                {children}
                <div className={css.submit}>
                    <span onClick={onSubmit} className={css.text}>submit</span>
                </div>
            </div>
        </div>
    </Shadow>);
};

export default FormPage;