import React from 'react';
import css from './SidebarRow.module.css';
import {ISidebarItem} from "./SidebarConfig";

interface IProps {
    item: ISidebarItem;
    toggleShow: () => any;
    changePath: (path: string) => any;
    show: boolean;
    sidebarMode: boolean;
}


const SidebarRow = (props: IProps) => {
    const {item, show, toggleShow, changePath, sidebarMode} = props;
    return (
        <div onClick={sidebarMode ? (item.path ? () => changePath(item.path) : toggleShow) : undefined}
             className={sidebarMode ? css.expand : css.collapse}>
            <i className={item.icon}/>
            <span className={css.caption}>{item.caption}</span>
            {item.path ? null : (<i className={sidebarMode && show ? css.up : css.down}/>)}
        </div>
    );
}

export default SidebarRow;