import React from "react";
import {
  ListItem,
  ListItemText,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff, Edit } from "@material-ui/icons";
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
  arrow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export const CarItem = ({ car }) => {
  const classes = useStyles();
  const {
    addToShowCars,
    removeFromShowCars,
    showCars,
    modalStore: { setEditingCarID },
  } = React.useContext(StoreContext);
  const [show, setShow] = React.useState(
    !!showCars.find((c) => c.uuid === car.uuid)
  );

  const onClick = () => {
    if (show) removeFromShowCars(car.uuid);
    else addToShowCars(car.uuid);
    setShow((prev) => !prev);
  };

  const onEditClick = () => {
    setEditingCarID(car.uuid);
  };

  return (
    <div className={classes.nested}>
      <div className={classes.item}>
        <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
          <ListItemText
            primary={car.id}
            primaryTypographyProps={{ style: { fontSize: 12 } }}
          />
          <IconButton size="small" onClick={onEditClick}>
            <Edit style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton onClick={onClick} className={classes.arrow} size="small">
            {show ? (
              <Visibility htmlColor="green" />
            ) : (
              <VisibilityOff htmlColor="blue" />
            )}
          </IconButton>
        </ListItem>
      </div>
    </div>
  );
};
