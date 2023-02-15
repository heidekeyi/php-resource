import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import TimeCategoryForm from "./TimeCategoryForm";
import TimeCategoryList from "./TimeCategoryList";
import TimeCategoryDelete from "./TimeCategoryDelete";
import TimeCategoryPagination from "./TimeCategoryPagination";
import TimeCategoryNavigation from "./TimeCategoryNavigation";
import TimeCategoryQuery from "./TimeCategoryQuery";

const TimeCategoryView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'TimeCategory';
    return (
        <React.Fragment>
            <TimeCategoryQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <TimeCategoryList/>
                <TimeCategoryPagination/>
            </ViewLayout>
            <TimeCategoryNavigation sidebarMode={sidebarMode} title={title}/>
            <TimeCategoryForm title={title}/>
            <TimeCategoryDelete/>
        </React.Fragment>
    );
};

export default TimeCategoryView;