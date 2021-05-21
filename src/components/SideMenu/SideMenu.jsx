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
import {
  Menu,
  ChevronLeft,
  DriveEta,
  TripOrigin,
  History,
} from "@material-ui/icons";
import { observer } from "mobx-react";
import { StoreContext } from "../../store/StoreContext";
import { CollapseItem } from "./CollapseItem";
import { TripItem } from "./TripItem";
import { HistoryItem } from "./HistoryItem";

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
            <List>{items}</List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List>{tripsItems}</List>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <List>{historyItems}</List>
          </TabPanel>
        </Drawer>
      </div>
    </>
  );
});
