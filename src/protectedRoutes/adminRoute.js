import React from "react";
import { Route, Redirect } from "react-router-dom";
export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (rest.user.userType === "admin") {
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
