import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

// Utils
// import auth from './auth';
const token = "!123"

const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    token !== null ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: 'auth/login',
        state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute; 