import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {sportRecordQueryDone, sportRecordService} from "./sliceSportRecord";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const SportRecordQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.sportRecord.query);
    const searchList = useAppSelect(state => state.sportRecord.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        const timezone = UtilQuery.timezone();
        query = {...query, pageIndex, pageSize, timezone};
        dispatch(loadingUpdate(true));
        sportRecordService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(sportRecordQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(sportRecordQueryDone(res.data));
                const path = `${routeRoutes.sportRecord.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default SportRecordQuery;