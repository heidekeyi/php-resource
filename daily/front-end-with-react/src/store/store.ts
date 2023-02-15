import {configureStore} from "@reduxjs/toolkit";
import sliceLoading from "../components/loading/sliceLoading";
import sliceMessage from "../components/message/sliceMessage";
import sliceSidebarMode from "../sidebar/sliceSidebarMode";
import sliceName from "../views/name/sliceName";
import sliceUnit from "../views/unit/sliceUnit";
import sliceSportCategory from "../views/sport/sliceSportCategory";
import sliceBillCategory from "../views/bill/sliceBillCategory";
import sliceTimeCategory from "../views/time/sliceTimeCategory";
import sliceSportRecord from "../views/sport/sliceSportRecord";
import sliceBillRecord from "../views/bill/sliceBillRecord";
import sliceTimeRecord from "../views/time/sliceTimeRecord";
import sliceTimeCalibration from "../views/time/sliceTimeCalibration";
import sliceSportCalibration from "../views/sport/sliceSportCalibration";
import sliceSportAmount from "../views/sport/sliceSportAmount";
import sliceSportTrace from "../views/sport/sliceSportTrace";
import sliceBillAmount from "../views/bill/sliceBillAmount";
import sliceBillAssets from "../views/bill/sliceBillAssets";
import sliceTimeAmount from "../views/time/sliceTimeAmount";
import sliceTimePercent from "../views/time/sliceTimePercent";

export const store = configureStore({
    reducer: {
        sidebarMode: sliceSidebarMode,
        loading: sliceLoading,
        message: sliceMessage,
        name: sliceName,
        unit: sliceUnit,
        sportCategory: sliceSportCategory,
        billCategory: sliceBillCategory,
        timeCategory: sliceTimeCategory,
        sportRecord: sliceSportRecord,
        billRecord: sliceBillRecord,
        timeRecord: sliceTimeRecord,
        timeCalibration: sliceTimeCalibration,
        sportCalibration: sliceSportCalibration,
        sportAmount: sliceSportAmount,
        sportTrace: sliceSportTrace,
        billAmount: sliceBillAmount,
        billAssets: sliceBillAssets,
        timeAmount: sliceTimeAmount,
        timePercent: sliceTimePercent,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;