import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {nameQueryDone, nameService} from "./sliceName";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const NameQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.name.query);
    const searchList = useAppSelect(state => state.name.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        query = {...query, pageIndex, pageSize};
        dispatch(loadingUpdate(true));
        nameService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(nameQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(nameQueryDone(res.data));
                const path = `${routeRoutes.name.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};

export default NameQuery;