import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {billRecordQueryDone, billRecordService} from "./sliceBillRecord";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const BillRecordQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.billRecord.query);
    const searchList = useAppSelect(state => state.billRecord.searchList);
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
        billRecordService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(billRecordQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(billRecordQueryDone(res.data));
                const path = `${routeRoutes.billRecord.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default BillRecordQuery;