import React from 'react';
import {
  Router,
  Route,
} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
let browserHistory = createBrowserHistory();

import Index from './index';
import Component from './component';

function Empty (props) {
  return <h1> Choose an Example </h1>;
}

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <Route path="example/:element/:example" component={Component} />
      <Route path="*" component={Empty}>
      </Route>
    </Route>
  </Router>
);

export default Routes;
