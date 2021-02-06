import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../modules/authorization/views/SignIn';
import SignUp from '../modules/authorization/views/SignUp';
import AddRecipes from '../modules/recipes/views/AddRecipes';
import MyRecipes from '../modules/recipes/views/MyRecipes';
import ShowRecipes from '../modules/recipes/views/ShowRecipe';
import UpdateRecipes from '../modules/recipes/views/UpdateRecipes';
import Route from './Route';

const GlobalRoute: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/cadastro" component={SignUp} />
    <Route path="/dashboard" component={MyRecipes} isPrivate />
    <Route path="/add" component={AddRecipes} isPrivate />
    <Route path="/update/:id" component={UpdateRecipes} isPrivate />
    <Route path="/show/:id" component={ShowRecipes} isPrivate />
  </Switch>
);

export default GlobalRoute;
