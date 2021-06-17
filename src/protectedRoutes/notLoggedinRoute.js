import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../authentication/use-auth.js";
export const NotLoggedinRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.user) {
          return <Component {...props} />;
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
