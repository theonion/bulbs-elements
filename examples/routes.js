import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
let browserHistory = createBrowserHistory();

import Index from './index';
import Component from './component';

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <Route path="example/:element/:example" component={Component} />
    </Route>
  </Router>
);

export default Routes
