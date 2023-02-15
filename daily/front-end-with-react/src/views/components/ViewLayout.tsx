import React from 'react';
import css from './ViewLayout.module.css';

interface IProps {
    children?: React.ReactNode;
    sidebarMode: boolean;
}

const ViewLayout = (props: IProps) => {
    const {sidebarMode, children} = props;
    return (<div className={sidebarMode ? css.expand : css.collapse}>
        <div className={css.content}>
            <div className={css.view}>
                {children}
            </div>
        </div>
    </div>);
};

export default ViewLayout;