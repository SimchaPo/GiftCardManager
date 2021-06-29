import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

export const LoggedinRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("rest", rest);
        if (auth.user) {
          return <Component {...props} />;
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
