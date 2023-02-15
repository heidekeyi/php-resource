import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {useNavigate} from "react-router-dom";
import {
    billAssetsService,
    billAssetsQueryDone,
} from "./sliceBillAssets";
import routeRoutes from "../../route/routeRoutes";

const BillAssetsQuery = () => {
    const {todo, searchList} = useAppSelect(state => state.billAssets);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        const timezone = UtilQuery.timezone();
        query = {...query, timezone};
        dispatch(loadingUpdate(true));
        billAssetsService.query<IObject[]>(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(billAssetsQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(billAssetsQueryDone(res.data));
                const path = `${routeRoutes.billAssets.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default BillAssetsQuery;