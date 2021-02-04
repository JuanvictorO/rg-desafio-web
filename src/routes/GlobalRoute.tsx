import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../modules/authorization/views/SignIn';
import SignUp from '../modules/authorization/views/SignUp';
import MyCourses from '../modules/course/views/MyCourses';
import Route from './Route';

const GlobalRoute: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={MyCourses} isPrivate />
  </Switch>
);

export default GlobalRoute;
