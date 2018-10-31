import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {Login} from './Login/src/Login';
import AppLogin from './Login/src/AppLogin';
export default (
  <Route path='/' component={AppLogin}>
    <Route path='Login' component={Login} />
    <Route path='*' component={AppLogin} />
  </Route>
);
