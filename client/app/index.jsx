import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, createMemoryHistory, RouterContext, match } from 'react-router';
import htmlTemplate from "htmlTemplate.js";
import Helmet from "react-helmet";
import App from "components/app.jsx";

import {routes} from "routes.jsx";

// Client render:
if (typeof window !== 'undefined') {
    // The render it fully, letting it fetch state
    ReactDOM.render(
        <App blank={false}><Router history={browserHistory} routes={routes}/></App>, 
        document.getElementById('root')
    );
}

// Exported static site renderer:
export default (locals, callback) => {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // Don't bother doing renderToString - there is state on the Client
    // and not on the server, which *will* cause a mismatch.
    var pageHtml = ReactDOMServer.renderToStaticMarkup(
        <App blank={true}><RouterContext {...renderProps} /></App>
    )
    var head = Helmet.rewind();
    callback(null, htmlTemplate(head, pageHtml));
  });
};