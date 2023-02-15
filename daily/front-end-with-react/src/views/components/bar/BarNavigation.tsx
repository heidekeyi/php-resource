import React from 'react';
import css from './BarNavigation.module.css';
import BarMode from "./BarMode";
import BarTitle from "./BarTitle";
import BarButton from "./BarButton";
import BarSearchList from "./BarSearchList";

interface IProps {
    sidebarMode: boolean;
    list: ISearch[];
    onSearch: () => any;
    onChange: (it: ISearch) => any;
    onNewClick?: () => any;
    title: string;
    hide?: boolean;
}

const space = (w: number = 9) => (<span style={{width: `${w}px`, flex: 'none'}}/>);

const BarNavigation = (props: IProps) => {
    const {hide, list, onNewClick, sidebarMode, onSearch, title, onChange} = props;
    return (
        <div className={sidebarMode ? css.expand : css.collapse}>
            <div className={css.content}>
                <div className={css.view}>
                    <div className={css.caption}>
                        <BarMode sidebarMode={sidebarMode}/>
                        {space()}
                        {hide
                            ? null
                            : (<React.Fragment>
                                <BarButton
                                    text={'new'}
                                    onClick={onNewClick}
                                    disable={!onNewClick}
                                />
                                {space(18)}
                            </React.Fragment>)
                        }
                        <BarTitle title={title}/>
                    </div>
                    <BarSearchList
                        list={list}
                        onChange={onChange}
                        onSearch={onSearch}
                    />
                </div>
            </div>
        </div>
    );
};

export default BarNavigation;