import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {unitQueryDone, unitService} from "./sliceUnit";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import routeRoutes from "../../route/routeRoutes";
import {useNavigate} from "react-router-dom";

const UnitQuery = () => {
    const {todo, pageIndex, pageSize} = useAppSelect(state => state.unit.query);
    const searchList = useAppSelect(state => state.unit.searchList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!todo) {
            return;
        }
        let query = UtilQuery.extract(searchList);
        query = {...query, pageIndex, pageSize};
        dispatch(loadingUpdate(true));
        unitService.query(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(unitQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(unitQueryDone(res.data));
                const path = `${routeRoutes.unit.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [pageIndex, pageSize, searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default UnitQuery;