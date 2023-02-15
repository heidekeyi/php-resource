import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {billCategoryQueryDone, billCategoryService} from "./sliceBillCategory";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const BillCategoryQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.billCategory.query);
    const searchList = useAppSelect(state => state.billCategory.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        query = {...query, pageIndex, pageSize};
        dispatch(loadingUpdate(true));
        billCategoryService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(billCategoryQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(billCategoryQueryDone(res.data));
                const path = `${routeRoutes.billCategory.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default BillCategoryQuery;