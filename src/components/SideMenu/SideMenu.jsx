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
import {
  CollapseItem,
  TripItem,
  HistoryItem,
  Filter,
  Footer,
  IntervalsForm,
  DateFilter,
} from "./";
import { TabPanel } from "../TabPanel";

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
  const {
    modalStore: { setAddCarShowing, setAddDepartmentShowing },
  } = React.useContext(StoreContext);

  return (
    <div className={style}>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<Add />}
        style={{ marginRight: 10, textTransform: "none" }}
        size="small"
        onClick={() => setAddDepartmentShowing(true)}
      >
        Department
      </Button>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<AddLocation />}
        size="small"
        style={{ textTransform: "none" }}
        onClick={() => setAddCarShowing(true)}
      >
        Car
      </Button>
    </div>
  );
};

export const SideMenu = observer(() => {
  const classes = useStyles();
  const {
    cars,
    departments,
    trips,
    models,
    searchHistory,
    currentTrips,
    setCurrentTrips,
    currentCars,
    setCurrentCars,
  } = React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const filters = ["model", "department"];
  const values = filters.reduce((acc, filter) => {
    const arr = [];
    let data = [];
    if (filter === "model") {
      data = models;
    } else if (filter === "department") {
      data = departments;
    }

    cars.forEach((car) => {
      const element = data.find((el) => el.id === car[filter]);
      if (!arr.includes(element)) {
        arr.push(element);
      }
    });
    return {
      ...acc,
      [filter]: arr,
    };
  }, {});

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
        trips.filter((trip) => trip.start_date >= startDate && trip.end_date <= endDate)
      );
  };

  const items = departments.map((dep) => {
    const itemList = currentCars.filter((car) => car.department == dep.id);
    //if (itemList.length === 0) return null;

    return (
      <CollapseItem
        key={dep.id.toString()}
        id={dep.id}
        title={dep.name}
        items={itemList}
        show={itemList.length > 0}
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
