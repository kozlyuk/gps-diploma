import React from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  Paper,
  IconButton,
  TextField,
  makeStyles,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Explore,
  RotateLeft,
} from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: 5,
    fontSize: 10,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  submitButton: {
    marginTop: 5,
  },
}));

export const IntervalsForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const {
    addToSearchHistory,
    showCars,
    userStore: { userId },
  } = React.useContext(StoreContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const {
      start_time: { value: startTime },
      end_time: { value: endTime },
    } = event.target.elements;
    let idsQuery = showCars.reduce(
      (acc, curr, i) => `${acc}&id=${curr.id}`,
      ""
    );
    idsQuery = idsQuery.slice(1);
    const query = `${idsQuery}&start_time=${startTime}&end_time=${endTime}`;
    const cache = localStorage.getItem(query);
    if (cache == null) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/cars/tracking/?${query}`;
      //const response = await axios.get(url);
      //  test response
      const pos = { lat: 51.55467836329367, lng: -0.54124053113658494 };
      const results = showCars.map((car) => ({
        id: car.id,
        records: [
          {
            lat: pos.lat + (Math.random() % 10),
            lng: pos.lng + (Math.random() % 1),
          },
          {
            lat: pos.lat + (Math.random() % 2),
            lng: pos.lng + (Math.random() % 5),
          },
          {
            lat: pos.lat + (Math.random() % 5),
            lng: pos.lng + (Math.random() % 3),
          },
          {
            lat: pos.lat + (Math.random() % 3),
            lng: pos.lng + (Math.random() % 8),
          },
          {
            lat: pos.lat + (Math.random() % 1),
            lng: pos.lng + (Math.random() % 7),
          },
        ],
      }));
      const data = {
        id: uuidv4(),
        ids: showCars.map((car) => car.uuid),
        records: results,
        startTime,
        endTime,
        userId,
      };
      addToSearchHistory(data);
      localStorage.setItem(query, results);
      return;
    }

    // const currentShowCarsIds = showCars.map((car) => car.uuid);

    // if (cache.ids === currentShowCarsIds) return;

    // const idsNotIncluded = currentShowCarsIds.map(
    //   (car) => !cache.ids.includes(car.uuid)
    // );
  };

  const onChange = (event) => {
    if (event.target.name === "start_time") setStartDate(event.target.value);
    else if (event.target.name === "end_time") setEndDate(event.target.value);
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <Paper style={{ marginTop: 5 }}>
      <ListItem
        button
        onClick={handleClick}
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <ListItemText
          primary={"Intervals"}
          primaryTypographyProps={{ style: { fontSize: 16 } }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <form className={classes.container} onSubmit={onSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Start date time"
              type="datetime-local"
              name="start_time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
              value={startDate}
              InputProps={{
                inputProps: {
                  max: `${new Date(Date.now())
                    .toISOString()
                    .slice(0, 10)}T${new Date(Date.now())
                    .toLocaleTimeString()
                    .slice(0, 5)}`,
                },
              }}
            />
            <TextField
              label="End date time"
              type="datetime-local"
              name="end_time"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={onChange}
              disabled={startDate === ""}
              InputProps={{
                inputProps: {
                  max: `${new Date(Date.now())
                    .toISOString()
                    .slice(0, 10)}T${new Date(Date.now())
                    .toLocaleTimeString()
                    .slice(0, 5)}`,
                },
              }}
            />
          </div>
          <div>
            <IconButton
              className={classes.submitButton}
              type="submit"
              variant="contained"
              color="secondary"
              size="small"
            >
              <Explore />
            </IconButton>
            <IconButton
              className={classes.submitButton}
              variant="outlined"
              color="secondary"
              size="small"
              onClick={reset}
            >
              <RotateLeft />
            </IconButton>
          </div>
        </form>
      </Collapse>
    </Paper>
  );
};
