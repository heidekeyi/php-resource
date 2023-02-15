import React from 'react';
import css from './Loading.module.css';
import Shadow, {stopPropagation} from "../shadow/Shadow";

interface IProps {
    show: boolean;
    onShadowClick: () => any;
}

const Loading = (props: IProps) => {
    return (<Shadow onShadowClick={props.onShadowClick} show={props.show}>
        <div className={css.page}>
            <div onClick={stopPropagation}>
                <svg className={css.svg} viewBox={'0 0 60 60'}>
                    <circle className={css.circle} cx={'30'} cy={'30'} r={'27'} fill={'none'}/>
                </svg>
            </div>
        </div>
    </Shadow>);
}

export default Loading;