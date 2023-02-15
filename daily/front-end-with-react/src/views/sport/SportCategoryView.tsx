import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import SportCategoryForm from "./SportCategoryForm";
import SportCategoryList from "./SportCategoryList";
import SportCategoryDelete from "./SportCategoryDelete";
import SportCategoryPagination from "./SportCategoryPagination";
import SportCategoryNavigation from "./SportCategoryNavigation";
import SportCategoryQuery from "./SportCategoryQuery";

const SportCategoryView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'SportCategory';
    return (
        <React.Fragment>
            <SportCategoryQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <SportCategoryList/>
                <SportCategoryPagination/>
            </ViewLayout>
            <SportCategoryNavigation sidebarMode={sidebarMode} title={title}/>
            <SportCategoryForm title={title}/>
            <SportCategoryDelete/>
        </React.Fragment>
    );
};

export default SportCategoryView;