import React from 'react';
import './assets/style/reset.css';
import './assets/style/clear.css';
import {BrowserRouter} from "react-router-dom";
import LoadingPage from "./components/loading/LoadingPage";
import MessagePage from "./components/message/MessagePage";
import SidebarPage from "./sidebar/SidebarPage";
import RouteRouter from "./route/RouteRouter";

const App = () => (
    <React.Fragment>
        <BrowserRouter>
            <RouteRouter/>
            <SidebarPage/>
            <LoadingPage/>
            <MessagePage/>
        </BrowserRouter>
    </React.Fragment>
);

export default App;