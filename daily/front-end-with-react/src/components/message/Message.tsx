import React from 'react';
import css from './Message.module.css';

export interface IMessage extends IResult {
    id: number;
}

interface IProps {
    list: IMessage[];
}

const Message = (props: IProps) => {
    return (
        <div className={css.page}>
            {props.list.map(it => {
                return (
                    <div className={css.main} key={it.id}>
                        <div className={css.view}>
                            <div className={it.status ? css.textSuccess : css.textError}>
                                <i className={it.status ? css.iconSuccess : css.iconError}/>
                                <span>{it.message}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Message;