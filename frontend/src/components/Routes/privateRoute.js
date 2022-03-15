import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogedIn } from "../utils/authentification";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogedIn() ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
