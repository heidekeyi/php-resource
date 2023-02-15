import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelect} from "../store/hooks";
import css from '../sidebar/SidebarPage.module.css';
import SidebarLogo from "../sidebar/SidebarLogo";
import SidebarConfig from "../sidebar/SidebarConfig";
import SidebarItem from "../sidebar/SidebarItem";

const SidebarPage = () => {
    const navigate = useNavigate();
    const changePath = (path: string) => {
        const {pathname} = window.location;
        if (pathname !== path) {
            navigate(path);
        }
    };
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<div className={sidebarMode ? css.expand : css.collapse}>
        <SidebarLogo sidebarMode={sidebarMode}/>
        {SidebarConfig.map(item => (<SidebarItem
            changePath={changePath}
            key={item.icon}
            sidebarMode={sidebarMode}
            item={item}/>))}
    </div>);
}

export default SidebarPage;