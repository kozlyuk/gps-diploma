import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";

export const Footer = () => {
  const {
    resetState,
    userStore: { resetUserData },
  } = React.useContext(StoreContext);

  const history = useHistory();

  const Logout = () => {
    resetUserData();
    resetState();
    history.push("/");
  };

  const showTrips = () => {
    history.push("/trips");
  };

  return (
    <>
      <List>
        <ListItem button onClick={showTrips}>
          <ListItemText primary="All trips" />
        </ListItem>
        <ListItem button onClick={Logout}>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </>
  );
};
