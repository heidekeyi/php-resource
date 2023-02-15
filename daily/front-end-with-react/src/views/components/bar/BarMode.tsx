import React from 'react';
import css from './BarMode.module.css';
import {useAppDispatch} from "../../../store/hooks";
import {modeSidebarToggle} from "../../../sidebar/sliceSidebarMode";

interface IProps {
    sidebarMode: boolean;
}

const BarMode = (props: IProps) => {
    const dispatch = useAppDispatch();
    return (
        <div className={css.page}>
            <i className={props.sidebarMode ? css.iconCollapse : css.iconExpand}
               onClick={() => dispatch(modeSidebarToggle())}/>
        </div>
    );
};

export default BarMode;