import React from 'react';

import Loading from "./Loading";
import {loadingUpdate} from "./sliceLoading";
import {useAppDispatch, useAppSelect} from "../../store/hooks";

const LoadingPage = () => {
    const dispatch = useAppDispatch();
    const show = useAppSelect(state => state.loading);
    const onShadowClick = () => dispatch(loadingUpdate(false));
    return (<Loading show={show} onShadowClick={onShadowClick}/>);
}

export default LoadingPage;