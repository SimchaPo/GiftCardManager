import React from "react";
import { Route, Redirect } from "react-router-dom";
export const LoggedinRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (rest.isAuthenticated()) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: rest.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
