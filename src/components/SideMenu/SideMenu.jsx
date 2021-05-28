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
  Add,
  AddLocation,
} from "@material-ui/icons";
import { observer } from "mobx-react";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem, TripItem, HistoryItem } from "./";
import { TabPanel } from "../TabPanel";
import { Filter, Footer } from "./";
import { IntervalsForm } from "./IntervalsForm";
import { DateFilter } from "./DateFilter";
import { AddDepartmentModal } from "../Modals/AddDepartmentModal";

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
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 30,
  },
  itemsList: {
    maxHeight: 300,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#555",
    },
  },
  addPanel: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
}));

const AddPanel = ({ style }) => {
  const [showDep, setShowDep] = React.useState(false);
  const [showCar, setShowCar] = React.useState(false);

  return (
    <div className={style}>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Add />}
        style={{ marginRight: 10, textTransform: "none" }}
        size="small"
        onClick={() => setShowDep(true)}
      >
        Department
      </Button>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<AddLocation />}
        size="small"
        style={{ textTransform: "none" }}
      >
        Car
      </Button>
      <AddDepartmentModal show={showDep} onClose={() => setShowDep(false)} />
    </div>
  );
};

export const SideMenu = observer(() => {
  const classes = useStyles();
  const { cars, departments, trips, searchHistory } =
    React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [currentCars, setCurrentCars] = React.useState(cars);
  const [currentTrips, setCurrentTrips] = React.useState(trips);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSetFilterValue = (filter, value) => {
    if (filter === "" || value === "") setCurrentCars(cars);
    else if (filter !== "" || value !== "")
      setCurrentCars(cars.filter((car) => car[filter] === value));
  };

  const onTripsFilter = (startDate, endDate) => {
    if (startDate === "" || endDate === "") setCurrentTrips(trips);
    else if (startDate !== "" || endDate !== "")
      setCurrentTrips(
        trips.filter((trip) => trip.date >= startDate && trip.date <= endDate)
      );
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

  const tripsItems = currentTrips.map((trip) => (
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
        <Drawer
          open={open}
          variant="persistent"
          style={{
            height: "100vh",
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            className={classes.drawerBackButton}
          >
            <ChevronLeft />
          </Button>
          <div className={classes.drawerContainer}>
            <div>
              <Paper>
                <Tabs value={value} onChange={handleChange}>
                  <Tab
                    className={classes.tab}
                    icon={<DriveEta htmlColor="#555" />}
                    value={0}
                    title="Cars"
                  />
                  <Tab
                    className={classes.tab}
                    icon={<TripOrigin htmlColor="#555" />}
                    value={1}
                    title="Trips"
                  />
                  <Tab
                    className={classes.tab}
                    icon={<History htmlColor="#555" />}
                    value={2}
                    title="Search History"
                  />
                </Tabs>
              </Paper>
              <TabPanel value={value} index={0}>
                <AddPanel style={classes.addPanel} />
                <IntervalsForm />
                <Filter
                  filters={filters}
                  values={values}
                  onSetFilterValue={onSetFilterValue}
                />
                <div className={classes.itemsList}>
                  <List>{items}</List>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DateFilter onFilter={onTripsFilter} />
                <div className={classes.itemsList}>
                  <List>{tripsItems}</List>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.itemsList}>
                {historyItems.length ? (
                  <List>{historyItems}</List>
                ) : (
                  <Typography variant="h6" align="center">
                    No data
                  </Typography>
                )}
              </TabPanel>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
});
