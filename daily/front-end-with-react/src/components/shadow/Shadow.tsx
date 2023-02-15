import React, {useEffect, useState} from 'react';
import css from './Shadow.module.css';

interface IProps {
    show?: boolean;
    onShadowClick: () => any;
    children?: React.ReactNode;
}

export const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

const Shadow = (props: IProps) => {
    const {show, onShadowClick, children} = props;
    const [stateTimes, setStateTimes] = useState<number>(3);
    const onClick = () => {
        let times = stateTimes - 1;
        if (times <= 0) {
            onShadowClick();
            times = 3;
        }
        setStateTimes(times);
    };
    useEffect(() => {
        if (!show) {
            setStateTimes(3);
        }
    }, [show])

    return (
        <div onClick={onClick}
             className={show ? css.show : css.hide}>
            {children}
        </div>
    );
};

export default Shadow;