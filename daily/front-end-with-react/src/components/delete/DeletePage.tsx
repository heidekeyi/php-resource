import React from 'react';
import css from './DeletePage.module.css';
import Shadow, {stopPropagation} from "../shadow/Shadow";

interface IProps {
    onCertain: () => any;
    onCancel: () => any;
    id: string;
    show: boolean;
}

const DeletePage = (props: IProps) => {
    const {show, id, onCancel, onCertain} = props;
    const message = `Deleting ID=${id} Certificate`;
    return (<Shadow show={show} onShadowClick={onCancel}>
        <div className={css.page}>
            <div className={css.content} onClick={stopPropagation}>
                <div>
                    <i className={css.icon}/>
                </div>
                <div className={css.message}>
                    <span>{message}</span>
                </div>
                <div className={css.button}
                     onClick={onCertain}>
                    <span>certain</span>
                </div>
            </div>
        </div>
    </Shadow>);
};

export default DeletePage;