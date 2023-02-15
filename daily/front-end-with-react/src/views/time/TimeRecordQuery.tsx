import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {timeRecordQueryDone, timeRecordService} from "./sliceTimeRecord";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const TimeRecordQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.timeRecord.query);
    const searchList = useAppSelect(state => state.timeRecord.searchList);
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
        timeRecordService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(timeRecordQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(timeRecordQueryDone(res.data));
                const path = `${routeRoutes.timeRecord.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [todo, pageIndex, pageSize, searchList, dispatch, navigate]);
    return (<React.Fragment/>)
};


export default TimeRecordQuery;