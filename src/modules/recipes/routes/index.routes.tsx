import React from 'react';

import Route from '../../../routes/Route';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

const AuthorizationRoute: React.FC = () => (
  <>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </>
);

export default AuthorizationRoute;
