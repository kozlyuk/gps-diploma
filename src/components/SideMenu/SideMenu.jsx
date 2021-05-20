import React from "react";
import {
  makeStyles,
  List,
  Drawer,
  Button,
  Tabs,
  Tab,
  Box,
  Paper,
} from "@material-ui/core";
import { Menu, ChevronLeft, DriveEta, TripOrigin } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem } from "./CollapseItem";
import { TripItem } from "./TripItem";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 0,
  },
  drawerButton: {
    zIndex: 401,
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "#fff",
  },
  drawerBackButton: {
    justifyContent: "flex-end",
  },
}));

export const SideMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const { cars, departments, trips } = React.useContext(StoreContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return <div>{value === index && <Box> {children} </Box>}</div>;
  };

  const items = departments.map((dep, i) => (
    <CollapseItem
      key={i}
      title={dep}
      items={cars.filter((car) => car.department === dep)}
    />
  ));

  const tripsItems = trips.map((trip) => (
    <TripItem key={trip.id.toString()} trip={trip} />
  ));

  return (
    <>
      <Button
        variant="contained"
        className={classes.drawerButton}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>
      <div className={classes.root} style={{ width: open ? "auto" : 0 }}>
        <Drawer open={open} variant="persistent" style={{ height: "100vh" }}>
          <Button
            onClick={() => setOpen(false)}
            className={classes.drawerBackButton}
          >
            <ChevronLeft />
          </Button>
          <Paper>
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<DriveEta htmlColor="#555" />} value={0} />
              <Tab icon={<TripOrigin htmlColor="#555" />} value={1} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <List>{items}</List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List>{tripsItems}</List>
          </TabPanel>
        </Drawer>
      </div>
    </>
  );
};
