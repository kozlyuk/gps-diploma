import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";

export const Footer = () => {
  const {
    userStore: { resetUserData },
    modalStore: { setShowTripsModal },
  } = React.useContext(StoreContext);

  const history = useHistory();
  const { url } = useRouteMatch();

  const Logout = () => {
    resetUserData();
    history.push("/");
  };

  const showTrips = () => {
    setShowTripsModal(true);
    history.push(`${url}/trips`);
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
