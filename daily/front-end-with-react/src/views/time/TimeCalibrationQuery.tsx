import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelect} from "../../store/hooks";
import UtilQuery from "../../utils/UtilQuery";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";
import {useNavigate} from "react-router-dom";
import {
    timeCalibrationService,
    timeCalibrationQueryDone,
} from "./sliceTimeCalibration";
import routeRoutes from "../../route/routeRoutes";

const TimeCalibrationQuery = () => {
    const {todo, searchList} = useAppSelect(state => state.timeCalibration);
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
        timeCalibrationService.query<IObject[]>(query).then(res => {
            dispatch(loadingUpdate(false));
            if (!res.status) {
                dispatch(timeCalibrationQueryDone());
                return dispatch(messageUpdate(res));
            }
            if (res.data) {
                dispatch(timeCalibrationQueryDone(res.data));
                const path = `${routeRoutes.timeCalibration.path}${UtilQuery.search(query)}`;
                navigate(path, {replace: true});
            }
        });
    }, [searchList, dispatch, navigate, todo]);
    return (<React.Fragment/>)
};


export default TimeCalibrationQuery;