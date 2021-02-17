import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import IndexPage from '../../pages/Index';
import TimerPage from '../../pages/Timer';
import UpdatePage from '../../pages/Update';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/update'>
        <UpdatePage />
      </Route>
      <Route path='/timer'>
        <TimerPage />
      </Route>
      <Route path='/'>
        <IndexPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
