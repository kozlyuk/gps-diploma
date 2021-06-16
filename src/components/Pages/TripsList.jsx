import React from "react";
import {
  List,
  Paper,
  Collapse,
  ListItem,
  ListItemText,
  makeStyles,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import {
  NavigateNext,
  ExpandLess,
  ExpandMore,
  Search,
} from "@material-ui/icons";
import {
  useRouteMatch,
  useHistory,
  Link,
} from "react-router-dom";

import { StoreContext } from "../../store/StoreContext";
import { CardTrip } from "../CardTrip";
import { IntervalsPickerForm } from "../Forms/IntervalsPickerForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  list: {
    marginTop: 20,
  },
  link: {
    textDecoration: "none",
    color: "#aaa",
    transition: "0.2s",
    "&:hover": {
      color: "#000",
    },
  },
});

export const TripsList = () => {
  const classes = useStyles();
  const { trips } = React.useContext(StoreContext);

  const [open, setOpen] = React.useState(false);
  const [showingTrips, setShowingTrips] = React.useState(trips);

  const { url } = useRouteMatch();
  const history = useHistory();

  const onFilterSubmit = (event) => {
    event.preventDefault();
    const {
      start_time: { value: startDate },
      end_time: { value: endDate },
    } = event.target.elements;

    if (startDate === "" || endDate === "") setShowingTrips(trips);
    else if (startDate !== "" || endDate !== "")
      setShowingTrips(
        trips.filter((trip) => trip.date >= startDate && trip.date <= endDate)
      );

    event.target.reset();
  };

  const handleReset = () => {
    setShowingTrips(trips);
  };

  const onTripPress = (tripID) => {
    history.push(`${url}/${tripID}`);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        <Link color="inherit" to="/" className={classes.link}>
          Map
        </Link>
        <Typography color="textPrimary">Trips list</Typography>
      </Breadcrumbs>
      <div className={classes.list}>
        <Paper style={{ marginTop: 5 }}>
          <ListItem
            button
            onClick={handleClick}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemText
              primary={"Filter"}
              primaryTypographyProps={{ style: { fontSize: 16 } }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <IntervalsPickerForm
              onSubmit={onFilterSubmit}
              align={"row"}
              submitIcon={<Search htmlColor="blue" />}
              onResetFilter={handleReset}
            />
          </Collapse>
        </Paper>
        <List>
          {showingTrips.map((trip) => (
            <CardTrip
              key={trip.id.toString()}
              trip={trip}
              onClick={() => onTripPress(trip.id)}
            />
          ))}
        </List>
      </div>
    </div>
  );
};
