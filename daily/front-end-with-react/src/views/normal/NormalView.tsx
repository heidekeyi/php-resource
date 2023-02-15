import React from 'react';
import css from './NormalView.module.css';
import img from '../../assets/images/404.png';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import BarNavigation from "../components/bar/BarNavigation";

const NormalView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    return (<React.Fragment>
        <ViewLayout sidebarMode={sidebarMode}>
            <div className={css.page}>
                <img
                    alt={''}
                    className={css.img}
                    src={img}
                />
            </div>
        </ViewLayout>
        <BarNavigation
            sidebarMode={sidebarMode}
            list={[]}
            hide={true}
            onSearch={() => ''}
            onChange={() => ''}
            title={'Normal'}
        />
    </React.Fragment>);
}

export default NormalView;