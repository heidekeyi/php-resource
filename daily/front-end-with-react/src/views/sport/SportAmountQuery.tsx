import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {useNavigate} from "react-router-dom";
import {
    sportAmountService,
    sportAmountQueryDone,
} from "./sliceSportAmount";
import routeRoutes from "../../route/routeRoutes";

const SportAmountQuery = () => {
    const {todo, searchList} = useAppSelect(state => state.sportAmount);
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
        sportAmountService.query<IObject[]>(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(sportAmountQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(sportAmountQueryDone(res.data));
                const path = `${routeRoutes.sportAmount.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};

export default SportAmountQuery;