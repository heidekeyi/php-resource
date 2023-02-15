import React from 'react';
import css from './SidebarLogo.module.css';

interface IProps {
    sidebarMode: boolean;
}

const SidebarLogo = (props: IProps) => {
    return (
        <div className={props.sidebarMode ? css.expand : css.collapse}>
            <i className={css.icon}/>
            <span className={css.caption}>Daily</span>
        </div>
    );
};


export default SidebarLogo;