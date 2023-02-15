import {PayloadAction} from "@reduxjs/toolkit";

interface ISliceDeleteState {
    delete: {
        id: string;
        show: boolean;
    };
}

const sliceDeleteState = (): ISliceDeleteState => {
    return {delete: {id: '', show: false}};
};

const sliceDeleteUpdate = (state: ISliceDeleteState, action: PayloadAction<IObject | undefined>) => {
    const item = action.payload;
    if (item) {
        const {id} = item;
        state.delete.id = id;
        state.delete.show = true;
    } else {
        state.delete.show = false;
    }
};

export {
    sliceDeleteState, sliceDeleteUpdate,
};