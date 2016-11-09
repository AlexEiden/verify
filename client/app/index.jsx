import React from "react";
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// Get routes
import { routes } from "./routes.jsx";

// If it's in browser, render to root el
if(typeof document !== 'undefined'){
    render(
        <Router routes={routes} history={browserHistory} />,
        document.getElementById('root')
    );
}

// Export routes so that ReactStaticPlugin can build them
export default routes;