import React, {useState} from 'react';
import {ISidebarItem} from "./SidebarConfig";
import css from './SidebarItem.module.css';
import SidebarRow from "./SidebarRow";
import SidebarDrawer from "./SidebarDrawer";
import SidebarColumn from "./SidebarColumn";

interface IProps {
    item: ISidebarItem;
    sidebarMode: boolean;
    changePath: (path: string) => any;
}

const SidebarItem = (props: IProps) => {
    const {sidebarMode, item, changePath} = props;
    const [stateShow, setStateShow] = useState<boolean>(false);
    const [stateHover, setStateHover] = useState<boolean>(false);
    return (<div className={sidebarMode ? css.expand : css.collapse}
                 onMouseEnter={sidebarMode ? undefined : () => setStateHover(true)}
                 onMouseLeave={sidebarMode ? undefined : () => setStateHover(false)}>
        <SidebarRow item={item}
                    sidebarMode={sidebarMode}
                    show={stateShow}
                    toggleShow={() => setStateShow(!stateShow)}
                    changePath={changePath}/>
        <SidebarDrawer show={sidebarMode && stateShow}
                       item={item}
                       changePath={changePath}/>
        <SidebarColumn show={!sidebarMode && stateHover}
                       item={item}
                       changeHover={setStateHover}
                       changePath={changePath}/>
    </div>);
};

export default SidebarItem;