import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {useNavigate} from "react-router-dom";
import {
    billAmountService,
    billAmountQueryDone,
} from "./sliceBillAmount";
import routeRoutes from "../../route/routeRoutes";

const BillAmountQuery = () => {
    const {todo, searchList} = useAppSelect(state => state.billAmount);
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
        billAmountService.query<IObject[]>(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(billAmountQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(billAmountQueryDone(res.data));
                const path = `${routeRoutes.billAmount.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};

export default BillAmountQuery;