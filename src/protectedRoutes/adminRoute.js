import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../components/UserContext";
export const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        if (user.userType === "admin") {
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
