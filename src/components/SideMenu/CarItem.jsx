import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export const CarItem = ({ car }) => {
  const classes = useStyles();

  const [show, setShow] = React.useState(false);
  const { addToShowCars, removeFromShowCars } =
    React.useContext(StoreContext);

  const onClick = () => {
    if (show) removeFromShowCars(car.id);
    else addToShowCars(car.id);
    setShow((prev) => !prev);
  };

  return (
    <div className={classes.item}>
      <ListItem button onClick={onClick}>
        <ListItemText primary={car.id} />
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
