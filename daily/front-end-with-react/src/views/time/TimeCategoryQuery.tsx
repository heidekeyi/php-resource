import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {timeCategoryQueryDone, timeCategoryService} from "./sliceTimeCategory";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const TimeCategoryQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.timeCategory.query);
    const searchList = useAppSelect(state => state.timeCategory.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        query = {...query, pageIndex, pageSize};
        dispatch(loadingUpdate(true));
        timeCategoryService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(timeCategoryQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(timeCategoryQueryDone(res.data));
                const path = `${routeRoutes.timeCategory.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default TimeCategoryQuery;