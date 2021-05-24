import React from "react";
import {
  makeStyles,
  List,
  Drawer,
  Button,
  Tabs,
  Tab,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  Menu,
  ChevronLeft,
  DriveEta,
  TripOrigin,
  History,
} from "@material-ui/icons";
import { observer } from "mobx-react";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem, TripItem, HistoryItem } from "./";
import { TabPanel } from "../TabPanel";
import { Filter } from "./Filter";

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
  tab: {
    minWidth: "100px",
  },
}));

export const SideMenu = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const { cars, departments, trips, searchHistory } =
    React.useContext(StoreContext);
  const [currentCars, setCurrentCars] = React.useState(cars);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSetFilterValue = (filter, value) => {
    if (filter === "" || value === "") setCurrentCars(cars);
    else setCurrentCars(cars.filter((car) => car[filter] === value));
  };

  const filters = [...Object.keys(cars[0])];
  filters.splice(filters.indexOf("record"), 1);
  filters.splice(filters.indexOf("id"), 1);
  const values = filters.reduce((acc, filter) => {
    const arr = [];
    cars.forEach((car) => {
      if (!arr.includes(car[filter])) arr.push(car[filter]);
    });
    return {
      ...acc,
      [filter]: arr,
    };
  }, {});

  const items = departments.map((dep) => {
    const itemList = currentCars.filter((car) => car.department === dep.name);
    if (itemList.length === 0) return null;

    return (
      <CollapseItem
        key={dep.id.toString()}
        id={dep.id}
        title={dep.name}
        items={itemList}
        show={dep.show}
      />
    );
  });

  const tripsItems = trips.map((trip) => (
    <TripItem key={trip.id.toString()} trip={trip} />
  ));

  const historyItems = searchHistory.map((item) => (
    <HistoryItem key={item.id.toString()} item={item} />
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
              <Tab
                className={classes.tab}
                icon={<DriveEta htmlColor="#555" />}
                value={0}
              />
              <Tab
                className={classes.tab}
                icon={<TripOrigin htmlColor="#555" />}
                value={1}
              />
              <Tab
                className={classes.tab}
                icon={<History htmlColor="#555" />}
                value={2}
              />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <Filter
              filters={filters}
              values={values}
              onSetFilterValue={onSetFilterValue}
            />
            <List>{items}</List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List>{tripsItems}</List>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {historyItems.length ? (
              <List>{historyItems}</List>
            ) : (
              <Typography variant="h6" align="center">
                No data
              </Typography>
            )}
          </TabPanel>
        </Drawer>
      </div>
    </>
  );
});
