import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import BillCategoryForm from "./BillCategoryForm";
import BillCategoryList from "./BillCategoryList";
import BillCategoryDelete from "./BillCategoryDelete";
import BillCategoryPagination from "./BillCategoryPagination";
import BillCategoryNavigation from "./BillCategoryNavigation";
import BillCategoryQuery from "./BillCategoryQuery";

const BillCategoryView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'BillCategory';
    return (
        <React.Fragment>
            <BillCategoryQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <BillCategoryList/>
                <BillCategoryPagination/>
            </ViewLayout>
            <BillCategoryNavigation sidebarMode={sidebarMode} title={title}/>
            <BillCategoryForm title={title}/>
            <BillCategoryDelete/>
        </React.Fragment>
    );
};

export default BillCategoryView;