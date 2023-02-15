import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {sportCategoryQueryDone, sportCategoryService} from "./sliceSportCategory";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const SportCategoryQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.sportCategory.query);
    const searchList = useAppSelect(state => state.sportCategory.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        query = {...query, pageIndex, pageSize};
        dispatch(loadingUpdate(true));
        sportCategoryService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(sportCategoryQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(sportCategoryQueryDone(res.data));
                const path = `${routeRoutes.sportCategory.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default SportCategoryQuery;