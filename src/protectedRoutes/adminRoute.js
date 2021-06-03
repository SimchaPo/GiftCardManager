import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../authentication/use-auth";
export const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user?.userType === "admin") {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
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
