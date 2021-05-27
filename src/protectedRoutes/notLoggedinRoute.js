import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../authentication/use-auth.js";
export const NotLoggedinRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (!auth.user) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/logout",
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
