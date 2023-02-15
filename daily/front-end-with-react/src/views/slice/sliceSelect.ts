import {PayloadAction} from "@reduxjs/toolkit";

interface ISliceSelectState {
    select: {
        path: string;
        item?: IObject;
    };
}

const sliceSelectState = (): ISliceSelectState => {
    return {
        select: {
            path: '',
            item: undefined
        }
    };
};

const sliceSelectPathUpdate = (state: ISliceSelectState, action: PayloadAction<string>) => {
    state.select.path = action.payload;
    state.select.item = undefined;
};
const sliceSelectItemUpdate = (state: ISliceSelectState, action: PayloadAction<IObject>) => {
    state.select.item = action.payload;
};

export {sliceSelectState, sliceSelectItemUpdate, sliceSelectPathUpdate};


