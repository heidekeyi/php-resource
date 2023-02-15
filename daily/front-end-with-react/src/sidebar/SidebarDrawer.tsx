import React from 'react';
import css from './SidebarDrawer.module.css';
import {ISidebarItem} from "./SidebarConfig";

export interface ISidebarDrawerProps {
    show: boolean;
    item: ISidebarItem
    changePath: (path: string) => any;
}

const SidebarDrawer = (props: ISidebarDrawerProps) => {
    const {item, show, changePath} = props;
    const height = show && !item.path ? `${item.list.length * 36}px` : '0';
    return (<div className={css.page}
                 style={{height}}>
        {item.list.map(it => {
            return (<div onClick={() => changePath(it.path)}
                         className={css.row}
                         key={it.path}>
                <i className={css.icon}/>
                <span className={css.caption}>{it.caption}</span>
            </div>)
        })}
    </div>);
};

export default SidebarDrawer;