import React from 'react';
import ViewLayout from "../components/ViewLayout";
import {useAppSelect} from "../../store/hooks";
import NameForm from "./NameForm";
import NameList from "./NameList";
import NameDelete from "./NameDelete";
import NamePagination from "./NamePagination";
import NameNavigation from "./NameNavigation";
import NameQuery from "./NameQuery";

const NameView = () => {
    const sidebarMode = useAppSelect(state => state.sidebarMode);
    const title = 'Name';
    return (
        <React.Fragment>
            <NameQuery/>
            <ViewLayout sidebarMode={sidebarMode}>
                <NameList/>
                <NamePagination/>
            </ViewLayout>
            <NameNavigation sidebarMode={sidebarMode} title={title}/>
            <NameForm title={title}/>
            <NameDelete/>
        </React.Fragment>
    );
};

export default NameView;