import React from 'react';
import css from './SidebarColumn.module.css';
import {ISidebarDrawerProps} from "./SidebarDrawer";

interface IProps extends ISidebarDrawerProps {
    changeHover: (hover: boolean) => any;
}

const SidebarColumn = (props: IProps) => {
    const {item, changePath, changeHover, show} = props;
    const onClick = (path: string) => {
        changePath(path);
        changeHover(false);
    }
    const maxWidth = show ? '135px' : '0';
    const height = show
        ? item.path
            ? `${60}px`
            : `${60 + 12 + item.list.length * 36}px`
        : '0';
    return (<div className={css.page}
                 style={{height, maxWidth}}>
        <div onClick={item.path ? () => onClick(item.path) : undefined}
             className={item.path ? css.active : css.disable}>
            <span>{item.caption}</span>
        </div>
        {item.list.map(it => (
            <div onClick={() => onClick(it.path)}
                 className={css.bd}
                 key={it.path}>
                <span>{it.caption}</span>
            </div>
        ))}
    </div>);
};

export default SidebarColumn;