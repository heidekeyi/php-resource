import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMessage} from "./Message";

const state: IMessage[] = [];

const sliceMessage = createSlice({
    name: 'message',
    initialState: state,
    reducers: {
        messageUpdate: (state, action: PayloadAction<IResult>) => {
            const now = Date.now();
            const delay = 12000;
            const list = state.filter(it => now - it.id <= delay)
            list.push({...action.payload, id: now});
            return list;
        },
        messageListUpdate: (state, action: PayloadAction<IResult[]>) => {
            const now = Date.now();
            const delay = 12000;
            const list = state.filter(it => now - it.id <= delay)
            action.payload.forEach(it => {
                const id = now + Math.ceil(Math.random() * 100) / 100;
                list.push({...it, id});
            });
            return list;
        }
    }
});

export const {messageUpdate, messageListUpdate} = sliceMessage.actions;

export default sliceMessage.reducer;