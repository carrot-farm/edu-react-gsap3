import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ScrollingPage } from '../pages';

const Routes = () =>
  <div>
    <Switch>
      <Route exact path="/" component={ScrollingPage} />
    </Switch>
  </div>

export default Routes;