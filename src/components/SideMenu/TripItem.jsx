import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { StoreContext } from "../../store/StoreContext";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export const TripItem = ({ trip }) => {
  const classes = useStyles();
  const { addToShowTrips, removeFromShowTrips, showTrips } =
    React.useContext(StoreContext);
  const [show, setShow] = React.useState(showTrips.includes(trip));

  const onClick = () => {
    if (show) removeFromShowTrips(trip.id);
    else addToShowTrips(trip.id);
    setShow((prev) => !prev);
  };
  return (
    <div className={classes.item}>
      <ListItem button onClick={onClick}>
        <ListItemText primary={trip.name} />
        <div>
          {show ? (
            <Visibility htmlColor="green" />
          ) : (
            <VisibilityOff htmlColor="blue" />
          )}
        </div>
      </ListItem>
    </div>
  );
};
