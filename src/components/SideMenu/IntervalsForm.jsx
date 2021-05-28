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

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      start_time: { value: startTime },
      end_time: { value: endTime },
    } = event.target.elements;
    // const startTime = event.target.elements.start_time.value;
    // const endTime = event.target.elements.end_time.value;
    let idsQuery = showCars.reduce(
      (acc, curr, i) => `${acc}&id=${curr.id}`,
      ""
    );
    idsQuery = idsQuery.slice(1);
    console.log(idsQuery);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/cars/tracking/?${idsQuery}&start_time=${startTime}&end_time=${endTime}`;
    console.log("post for interval: ", url);
    const data = {
      id: Date.now(),
      ids: showCars.map((car) => car.id),
      records: [],
      startTime,
      endTime,
      userId,
    };
    console.log("search data: ", data);
    addToSearchHistory(data);
    const pos = { lat: 51.55467836329367, lng: -0.54124053113658494 };
    const results = [
      showCars.map((car) => ({
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
      })),
    ];
    console.log(results);
  };

  const onChange = (event) => {
    if (event.target.name === "start_time") setStartDate(event.target.value);
    else if (event.target.name === "end_time") setEndDate(event.target.value);
  };

  const reset = () => {
    console.log(111);
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
              inputProps={{ max: new Date(Date.now()).toString() }}
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
              inputProps={{ max: new Date(Date.now()) }}
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
