import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../modules/authorization/views/SignIn';
import SignUp from '../modules/authorization/views/SignUp';
import MyRecipes from '../modules/recipes/views/MyRecipes';
import Route from './Route';

const GlobalRoute: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastro" component={SignUp} />
    <Route path="/dashboard" component={MyRecipes} />
  </Switch>
);

export default GlobalRoute;
