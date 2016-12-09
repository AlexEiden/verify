import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, createMemoryHistory, RouterContext, match } from 'react-router';
import htmlTemplate from "htmlTemplate.js";
import Helmet from "react-helmet";

// Get routes
import { routes } from "./routes.jsx";


// Client render (optional):
if (typeof document !== 'undefined') {
    ReactDOM.render(
        <Router history={browserHistory} routes={routes} />, 
        document.getElementById('root')
    );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    var pageHtml = ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
    var head = Helmet.rewind();
    callback(null, htmlTemplate(head, pageHtml));
  });
};