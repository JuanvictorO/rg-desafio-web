import React from 'react';

import Route from '../../../routes/Route';
import SignIn from '../views/MyRecipes';

const AuthorizationRoute: React.FC = () => (
  <>
    <Route path="/" exact component={SignIn} />
  </>
);

export default AuthorizationRoute;
