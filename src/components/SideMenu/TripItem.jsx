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
  const classses = useStyles();
  const [show, setShow] = React.useState(false);
  const { addToShowTrips, removeFromShowTrips } =
    React.useContext(StoreContext);

  const onClick = () => {
    if (show) removeFromShowTrips(trip.id);
    else addToShowTrips(trip.id);
    setShow((prev) => !prev);
  };
  return (
    <div className={classses.item}>
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
