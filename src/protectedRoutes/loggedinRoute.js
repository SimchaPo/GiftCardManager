import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../authentication/use-auth.js";

export const LoggedinRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        console.log("loggedin route", auth);
        if (auth.user) {
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
