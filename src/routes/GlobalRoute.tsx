import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../modules/authorization/views/SignIn';
// import MyRecipes from '../modules/course/views/MyRecipes';
import Route from './Route';

const GlobalRoute: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/dashboard" component={MyRecipes} isPrivate /> */}
  </Switch>
);

export default GlobalRoute;
