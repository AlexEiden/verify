import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, browserHistory, RoutingContext, match } from 'react-router';

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
    callback(null, template({
      html: ReactDOMServer.renderToString(<RoutingContext {...renderProps} />),
      assets: locals.assets
    }));
  });
};