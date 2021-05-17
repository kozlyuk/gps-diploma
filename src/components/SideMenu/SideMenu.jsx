import React from "react";
import { makeStyles, List, Drawer, Button } from "@material-ui/core";
import { Menu, ChevronLeft } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem } from "./CollapseItem";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 0,
  },
  drawerButton: {
    zIndex: 401,
    position: "absolute",
    left: 15,
    top: 80,
    backgroundColor: "#fff",
  },
  drawerBackButton: {
    justifyContent: "flex-end"
  }
}));

export const SideMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
      <Button className={classes.drawerButton} onClick={() => setOpen(true)}>
        <Menu />
      </Button>
      <div className={classes.root} style={{ width: open ? "auto" : 0 }}>
        <Drawer open={open} variant="persistent" style={{ height: "100vh" }}>
          <Button onClick={() => setOpen(false)} className={classes.drawerBackButton}>
            <ChevronLeft />
          </Button>
          <List>{items}</List>
        </Drawer>
      </div>
    </>
  );
};
