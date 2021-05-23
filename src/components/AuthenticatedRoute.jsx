import React from "react";
import { Route, Redirect } from "react-router-dom";
import { StoreContext } from "../store/StoreContext";

export const AuthenticatedRoute = ({ children, ...rest }) => {
  const {
    userStore: { userId },
  } = React.useContext(StoreContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        userId === null ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          children
        )
      }
    />
  );
};
