import React from 'react';
import Message from "./Message";
import {useAppSelect} from "../../store/hooks";

const MessagePage = () => {
    const message = useAppSelect(state => state.message);
    return (<Message list={message}/>);
}

export default MessagePage;