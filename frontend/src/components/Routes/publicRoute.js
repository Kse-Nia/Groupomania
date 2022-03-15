import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLogedIn } from "../utils/authentification";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogedIn() && restricted ? (
          <Navigate to="/profile" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
