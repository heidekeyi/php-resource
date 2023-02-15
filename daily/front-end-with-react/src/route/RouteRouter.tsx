import React from 'react';
import {Routes, Route} from "react-router-dom";
import routeRoutes from "./routeRoutes";
import NameView from "../views/name/NameView";
import UnitView from "../views/unit/UnitView";
import SportCategoryView from "../views/sport/SportCategoryView";
import BillCategoryView from "../views/bill/BillCategoryView";
import TimeCategoryView from "../views/time/TimeCategoryView";
import SportRecordView from "../views/sport/SportRecordView";
import BillRecordView from "../views/bill/BillRecordView";
import TimeRecordView from "../views/time/TimeRecordView";
import NormalView from "../views/normal/NormalView";
import TimeCalibrationView from "../views/time/TimeCalibrationView";
import SportTraceView from "../views/sport/SportTraceView";
import SportCalibrationView from "../views/sport/SportCalibrationView";
import SportAmountView from "../views/sport/SportAmountView";
import BillAmountView from "../views/bill/BillAmountView";
import BillAssetsView from "../views/bill/BillAssetsView";
import TimeAmountView from "../views/time/TimeAmountView";
import TimePercentView from "../views/time/TimePercentView";

const RouteRouter = () => {
    return (
        <Routes>
            <Route element={<NameView/>} path={routeRoutes.name.path}/>
            <Route element={<UnitView/>} path={routeRoutes.unit.path}/>
            <Route element={<SportCategoryView/>} path={routeRoutes.sportCategory.path}/>
            <Route element={<BillCategoryView/>} path={routeRoutes.billCategory.path}/>
            <Route element={<TimeCategoryView/>} path={routeRoutes.timeCategory.path}/>
            <Route element={<SportRecordView/>} path={routeRoutes.sportRecord.path}/>
            <Route element={<BillRecordView/>} path={routeRoutes.billRecord.path}/>
            <Route element={<TimeRecordView/>} path={routeRoutes.timeRecord.path}/>
            <Route element={<TimeCalibrationView/>} path={routeRoutes.timeCalibration.path}/>
            <Route element={<SportCalibrationView/>} path={routeRoutes.sportCalibration.path}/>
            <Route element={<SportAmountView/>} path={routeRoutes.sportAmount.path}/>
            <Route element={<SportTraceView/>} path={routeRoutes.sportTrace.path}/>
            <Route element={<BillAmountView/>} path={routeRoutes.billAmount.path}/>
            <Route element={<BillAssetsView/>} path={routeRoutes.billAssets.path}/>
            <Route element={<TimeAmountView/>} path={routeRoutes.timeAmount.path}/>
            <Route element={<TimePercentView/>} path={routeRoutes.timePercent.path}/>
            <Route element={<NormalView/>} path={'*'}/>
        </Routes>
    );
}

export default RouteRouter;