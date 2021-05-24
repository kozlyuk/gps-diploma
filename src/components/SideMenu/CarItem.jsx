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
  const { addToShowCars, removeFromShowCars, showCars } =
    React.useContext(StoreContext);
  const [show, setShow] = React.useState(showCars.includes(car));

  const onClick = () => {
    if (show) removeFromShowCars(car.id);
    else addToShowCars(car.id);
    setShow((prev) => !prev);
  };

  return (
    <div className={classes.nested}>
      <div className={classes.item}>
        <ListItem button onClick={onClick} style={{paddingTop: 0, paddingBottom: 0}}>
          <ListItemText
            primary={car.id}
            primaryTypographyProps={{ style: { fontSize: 12 } }}
          />
          <div>
            {show ? (
              <Visibility htmlColor="green" />
            ) : (
              <VisibilityOff htmlColor="blue" />
            )}
          </div>
        </ListItem>
      </div>
    </div>
  );
};
