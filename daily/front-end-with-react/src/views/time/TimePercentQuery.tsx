import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {useNavigate} from "react-router-dom";
import {
    timePercentService,
    timePercentQueryDone,
} from "./sliceTimePercent";
import routeRoutes from "../../route/routeRoutes";

const TimePercentQuery = () => {
    const {todo, searchList} = useAppSelect(state => state.timePercent);
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
        timePercentService.query<IObject[]>(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(timePercentQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(timePercentQueryDone(res.data));
                const path = `${routeRoutes.timePercent.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};

export default TimePercentQuery;