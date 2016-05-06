import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router';

import Index from './index';
import {
	Component,
	RenderComponent,
} from './component';

function Empty () {
  return <h1> Choose an Example </h1>;
}

const Routes = (
  <Router history={browserHistory}>
		<Route path="/render-example/:element/:example" component={RenderComponent} />
    <Route path="/" component={Index}>
      <Route path="example/:element/:example/:device" component={Component} />
      <Route path="*" component={Empty}/>
    </Route>
  </Router>
);

export default Routes;
