import React from "react";
import { makeStyles, List } from "@material-ui/core";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem } from "./CollapseItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SideMenu = () => {
  const classes = useStyles();
  const { cars, departments } = React.useContext(StoreContext);

  const items = departments.map((dep, i) => (
    <CollapseItem
      key={i}
      title={dep}
      items={cars.filter((car) => car.department === dep)}
    />
  ));

  return (
    <>
      <List className={classes.root}>{items}</List>
    </>
  );
};
